import React from 'react';
import Box from '@mui/material/Box';
import * as THREE from "three";
import './VisualizarCaminhos3D.css'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Minimap from './VisualizadorClasses/Minimap'
import axios from 'axios'
import { BASE_URL_MDRS, BASE_URL_ANALISADOR } from '../../apis/BaseUrl'
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { getIdJogadorAutenticado } from '../../utils/JogadorIDLocalStorage'
import { test } from '../../utils/testesLocaisParaVizualizacao'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import PickHelper from './VisualizadorClasses/PickHelper'
import makeTextSprite from './VisualizarClasses3D/grafo/TextSpriteFactory'
import { buscarJogadorPeloId } from '../../Service/BuscarJogadorPeloIdService'
import { pesquisarCaminhoEntreJogadores, pesquisarCaminhoEntreJogadoresEstados } from '../../Service/PesquisarCaminhoEntreJogadores'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

let scene, renderer, orbit, angle, angle1, cos, sin, cos1, sin1;

let canvas;

let camera, controls, clock, cameraMinimap, label;

let geoIntersect = [];
const estados = [];
const objects = [];

let raycaster;



let orbitEnabled = true;
let firstPersonEnabled = false;


const vertex = new THREE.Vector3();
const color = new THREE.Color();


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}




const VisualizarCaminhos3D = () => {

    const mountRef = React.useRef();
    const User_ID = getIdJogadorAutenticado();


    const [caminho, setCaminho] = React.useState(["Central"]);
    

    const handleToggleOrbit = (event) => {
        if (controls !== undefined) {
            controls.dispose()
        }
        orbit = new OrbitControls(camera, renderer.domElement)
        orbit.enableRotate = true;
        orbit.enablePan = true;
        orbit.enableZoom = true;
        orbit.maxPolarAngle = Math.PI / 2;
        orbitEnabled = true;

        firstPersonEnabled = false;

    }

    const handleToggleFirstPerson = (event) => {
        orbit.dispose();
        controls = new FirstPersonControls(camera)
        controls.lookSpeed = 0.5;
        controls.lookVertical = true;
        controls.activeLook = true;
        controls.movementSpeed = 50;
        orbitEnabled = false;
        firstPersonEnabled = true;

    }



    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }



    React.useEffect(() => {

        cameraMinimap = new Minimap();
        clock = new THREE.Clock(true)
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(-54, 25,  16);
        camera.lookAt(50, 5, -10)


        scene = new THREE.Scene();
        scene.add(camera);

        //scene.background = new THREE.Color(0xffffff);
        //scene.fog = new THREE.Fog(0xffffff, 0, 750);

        //Escolher qual luz usar pois afeta cores da esfera

        const light2 = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light2);

        const lightp1 = new THREE.PointLight(0xffffff, 0.5, 10);
        lightp1.position.set(10, 10, 10);
        scene.add(lightp1);

        const lightp2 = new THREE.PointLight(0xffffff, 0.5, 10);
        lightp2.position.set(20, 10, 60);
        scene.add(lightp2);

        const flashlight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2);
        flashlight.shadow.mapSize.width = 512;
        flashlight.shadow.mapSize.height = 512;
        flashlight.shadow.camera.near = 10;
        flashlight.shadow.camera.far = 200;
        flashlight.shadow.focus = 1;
        flashlight.castShadow = true;
        flashlight.target = camera;
        flashlight.position.set(0, 0, 2);
        camera.add(flashlight);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth - 10, window.innerHeight - 65);
        renderer.autoClear = false;
        renderer.setClearColor(new THREE.Color(0xffffff), 1);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        canvas = renderer.domElement;
        mountRef.current.appendChild(canvas);


        orbit = new OrbitControls(camera, canvas)
        orbit.enableRotate = true;
        orbit.enablePan = true;
        orbit.enableZoom = true;
        orbit.maxPolarAngle = Math.PI / 2;
        orbit.update()

        // floor

        let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        floorGeometry.rotateX(- Math.PI / 2);

        // vertex displacement

        let position = floorGeometry.attributes.position;

        for (let i = 0, l = position.count; i < l; i++) {

            vertex.fromBufferAttribute(position, i);

            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;

            position.setXYZ(i, vertex.x, vertex.y, vertex.z);

        }

        floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

        position = floorGeometry.attributes.position;
        const colorsFloor = [];

        for (let i = 0, l = position.count; i < l; i++) {

            color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            colorsFloor.push(color.r, color.g, color.b);

        }

        floorGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsFloor, 3));

        const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });

        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.receiveShadow = true;
        scene.add(floor);

        const sphereGeometry = new THREE.SphereGeometry(5, 40, 30);

        position = sphereGeometry.attributes.position;
        const colorsBox = [];

        for (let i = 0, l = position.count; i < l; i++) {

            color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            colorsBox.push(color.r, color.g, color.b);

        }
        sphereGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsBox, 3));


        const sphereMaterial = new THREE.MeshStandardMaterial({ specular: 0xffffff, flatShading: true, vertexColors: true });
        sphereMaterial.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = 5
        sphere.position.y = 8
        sphere.position.z = 15
        sphere.castShadow = true
        sphere.receiveShadow = true
        scene.add(sphere);
        geoIntersect.push(sphere)
        var spritey = makeTextSprite(caminho[0],
            {});
        spritey.position.set(sphere.position.x, sphere.position.y + 1, sphere.position.z - 5);
        scene.add(spritey);
        objects.push(sphere);
        const angleIncrement = 15 * Math.PI / 60.0;
        const angleIncrement2 = 2.5 * Math.PI / 60.0;
        angle = 0.0;
        angle1 = 0.0;
        const radius = 100;
        const radius0 = 300;
        let x = 0;
        //console.log(redeSocial)
        let pos = new THREE.Vector3(sphere.position.x, sphere.position.y, sphere.position.z)
            ;
        //console.log(redeSocial.mood)
        var radius_sphere = 25
        for (let i = 1; i < caminho.length; i++) {
            cos = Math.cos(angle);
            sin = Math.sin(angle);
            //getRandomArbitrary(40, 100);
            angle1 = angle;
            const sphereMaterial2 = new THREE.MeshPhongMaterial({ specular: 0xffffff, flatShading: true, vertexColors: true });
            sphereMaterial2.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            //console.log(redeSocial.ligacoesDto[i])
            const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere2.position.x = radius_sphere
            sphere2.position.y = 8;
            sphere2.position.z = 15;
            var spritey = makeTextSprite(caminho[i],
                {});
            spritey.position.set(sphere2.position.x, sphere2.position.y + 1, sphere2.position.z - 5);
            scene.add(spritey);
            scene.add(sphere2);
            objects.push(sphere2);

            const positions = [];
            positions.push(5, 8, 15);
            positions.push(sphere2.position.x, 8, sphere2.position.z)
            pos = new THREE.Vector3(sphere2.position.x, sphere2.position.y, sphere2.position.z)
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            let matLineBasic = new THREE.LineBasicMaterial({ vertexColors: false, color: 0xff00ff, linewidth: 7 });
            //let matLineDashed = new THREE.LineDashedMaterial( { vertexColors: true, scale: 2, dashSize: 1, gapSize: 1 } );
            const line1 = new THREE.Line(geo, matLineBasic);
            scene.add(line1);
            angle = angle1;
            angle += angleIncrement;
            radius_sphere += 25
        }


        // window.addEventListener('resize', onWindowResize);
        // document.addEventListener('keydown', (event) => {
        //     const keyName = event.key;
        //     if (keyName === 'p') handleToggleFirstPerson(event);
        //     if (keyName === 'o') handleToggleOrbit(event)
        // });

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth - 80, window.innerHeight - 200);

        }


        function animate() {

            requestAnimationFrame(animate);
            //label.lookAt(camera.position);
            if (firstPersonEnabled) {
                controls.update(clock.getDelta());
            } else {
                orbit.update();
            }

            
            renderer.setViewport(0, 0, canvas.width, canvas.height);
            renderer.clear();

            renderer.render(scene, camera);

            renderer.setViewport(canvas.width - 210, canvas.height - 480, 200, 200);

            renderer.clearDepth();

            renderer.render(scene, cameraMinimap.cameraMinimapObject);

            renderer.render(scene, camera);

        }
        animate();
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(canvas);
            }

        }


    }, [caminho]);

    const [state, setState] = React.useState(false);
    const [estado, setEstado] = React.useState("");
    const [valor, setValor] = React.useState("0");

    const handleChangeCheck = (event) => {
        setState(event.target.checked);
    };

    const [url, setUrl] = React.useState("")

    const handleChange = (event) => {
        switch (event.target.value) {
            case 'caminhoMaisForteDFS':
                if (state) {
                    setUrl("caminho-forte-dfs-estados")
                } else {
                    setUrl("caminho-forte-dfs")
                }
                break;
            case 'caminhoMaisForteBestFrist':
                if (state) {
                    setUrl("caminho-forte-best-estados")
                } else {
                    setUrl("caminho-forte-best")
                }
                break;
            case 'caminhoMaisForteAstar':
                if (state) {
                    setUrl("caminho-forte-a-star-estados")
                } else {
                    setUrl("caminho-forte-a-star")
                }
                break;
            case 'caminhoMaisCurto':
                if (state) {
                    alert("estado selecionado")
                } else {
                    setUrl("caminho-curto")
                }
                break;
            case 'caminhoMaisSeguro':
                if (state) {
                    alert("estado selecionado")
                } else {
                    setUrl("caminho-seguro")
                }
                break;
        }
    };

    const [destino, setDestino] = React.useState("");
    const [origem, setOrigem] = React.useState("");

    const handleChangeDestino = (event) => {
        setDestino(event.target.value)
    }

    const handleChangeOrigem = (event) => {
        setOrigem(event.target.value)
    }

    const handleSubmit = async () => {
        if (state) {
            pesquisarCaminhoEntreJogadoresEstados(setCaminho, origem, destino, url, estado, valor)

        } else {
            pesquisarCaminhoEntreJogadores(setCaminho, origem, destino, url)

        }
    }

    const handleChangeEstado = (event) => {
        setEstado(event.target.value)
    }
    const handleChangeValor = (event) => {
        setValor(event.target.value)
    }


    return (
        <>
            <div className="menu_container">
                <h2>Escolha o caminho entré jogadores!</h2>

                <Box sx={{ display: 'flex' }}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Escolha 1 dos tipos de caminho</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            //value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="caminhoMaisForteDFS" control={<Radio />} label="caminho Mais Forte DFS" />
                            <FormControlLabel value="caminhoMaisForteBestFrist" control={<Radio />} label="caminho Mais Forte Best Frist" />
                            <FormControlLabel value="caminhoMaisForteAstar" control={<Radio />} label="caminho Mais Forte A-star" />
                            <FormControlLabel value="caminhoMaisCurto" control={<Radio />} label="caminho Mais Curto" />
                            <FormControlLabel value="caminhoMaisSeguro" control={<Radio />} label="caminho Mais Seguro" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={state} onChange={handleChangeCheck} name="estados" />
                                }
                                label="Considerar Estados"
                            />
                            <TextField
                                onChange={handleChangeEstado}
                                value={estado}
                                label={"estado"} //optional
                            />
                            <TextField
                                onChange={handleChangeValor}
                                value={valor}
                                label={"valor"} //optional
                            />
                        </FormGroup>
                    </FormControl>

                </Box>

                <TextField
                    onChange={handleChangeOrigem}
                    value={origem}
                    label={"Origem"} //optional
                />
                <TextField
                    onChange={handleChangeDestino}
                    value={destino}
                    label={"Destino"} //optional
                />

                <button onClick={handleSubmit}>Enviar</button>

            </div>

            <div className="btn_container">
                <button onClick={handleToggleOrbit}>Orbit</button>
                <button onClick={handleToggleFirstPerson}>First Person</button>
            </div>
            <div ref={mountRef} id='parent'>
            </div>
        </>
    )


}


export default VisualizarCaminhos3D