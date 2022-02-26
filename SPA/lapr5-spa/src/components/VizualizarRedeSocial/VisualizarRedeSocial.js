import React, { Component } from "react";
import * as THREE from "three";
import './VisualizarRedeSocial.css'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import No from './VisualizadorClasses/No';
import Edge from './VisualizadorClasses/Edge';
import Minimap from './VisualizadorClasses/Minimap'
import MolduraMinimap from './VisualizadorClasses/MolduraMinimap'
import CameraPrincipal from './VisualizadorClasses/CameraPrincipal'
import axios from 'axios'
import { BASE_URL_MDRS } from '../../apis/BaseUrl'
import { TextField } from "@mui/material";
import { getIdJogadorAutenticado } from '../../utils/JogadorIDLocalStorage'
import { test } from '../../utils/testesLocaisParaVizualizacao'
import {Box} from '@mui/material';
import Button from '@mui/material/Button';

let scene, renderer, orbit, angle, angle1, cos, sin, cos1, sin1;
let watch0, canvas;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const VisualizarRedeSocial = () => {

    const [nivel, setNivel] = React.useState('1');

    const mountRef = React.useRef();
    const User_ID = getIdJogadorAutenticado();

    const [redeSocial, setRedeSocial] = React.useState({
        nomeJogador: "Nó Central",
        ligacoesDto: []
    });

    const handleSubmit = async () => {
        await axios
            .get(`${BASE_URL_MDRS}/api/Jogadores/rede-social/${nivel}/${User_ID}`)
            .then(response => { setRedeSocial(response.data) })
            .catch(err => {
                alert(err.message)
            })
    }

    const handleChange = (event) => {
        event.preventDefault();
        setNivel(event.target.value)
    }

    React.useEffect(() => {
        const cameraPrincipal = new CameraPrincipal();//cria o objeto com a camera principal dentro
        const cameraMinimap = new Minimap(); // cria o objeto com o minimapa dentro
        const molduraMinimap = new MolduraMinimap();// cria o objeto com a scena 2d 

        scene = new THREE.Scene();
        // Create a renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
        renderer.autoClear = false;
        renderer.setClearColor(new THREE.Color(0x999999), 1);
        canvas = renderer.domElement;
        mountRef.current.appendChild(canvas);

        //Controles orbitais para ativar zoom e pan
        orbit = new OrbitControls(cameraPrincipal.camera, canvas);
        orbit.enableRotate = false;
        orbit.enablePan = true;
        orbit.mouseButtons = { LEFT: THREE.MOUSE.PAN };
        orbit.touches = {
            ONE: THREE.TOUCH.DOLLY_PAN
        }
        orbit.maxZoom = 1;

        //set posicao inicial da camera e update dos movimentos do orbit
        cameraPrincipal.camera.position.set(0, 0, 0.2);
        orbit.update();


        //Chama a funcao window resize toda as vezes que o tamnho da tela muda, ou seja, sempre que ocorre um resize
        //window.addEventListener('resize', windowResize);
        console.log(redeSocial)
        // Create nó central
        //redeSocial.nomeJogador
        //test.nomeCentra
        watch0 = new No(redeSocial.nomeJogador, new THREE.Vector3(0.0, 0.0, 0.1), 0.5, 0x999999, 0xffffff, 0xffff, 0xcccccc, 0xffffff, 0xff0000);
        scene.add(watch0.object);

        //var posicaiXInicial = 0.7;
        //var posicaiYInicial = 0.7;
        const angleIncrement = 5 * Math.PI / 60.0;
        const angleIncrement2 = 2.5 * Math.PI / 60.0;
        angle = 0.0;
        angle1 = 0.0;
        const radius = 1;
        const radius0 = 2.3;
        //subtituir para test.ligacoes.length
        //redeSocial.ligacoesDto.length
        for (let i = 0; i < redeSocial.ligacoesDto.length; i++) { //amigos diretos
            cos = Math.cos(angle);
            sin = Math.sin(angle);
            //let radius = getRandomArbitrary(0.5, 1);
            angle1 = angle;
            //redeSocial.ligacoesDto[i].nomeJogador
            //test.ligacoes[i].nome;
            const directNodes = new No(redeSocial.ligacoesDto[i].nomeJogador, new THREE.Vector3(radius * cos, radius * sin, 0.1), 0.25, 0x999999, 0xffffff, 0x88888, 0xcccccc, 0xffffff, 0xff0000);
            const edge1 = new Edge('', new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(radius * cos, radius * sin, 0.0), 0.25, 0x999999, 0xffffff, 0x333333, 0xcccccc, 0xffffff, 0xff0000)
            scene.add(edge1.object);
            //const edge - central ao no criado anteriomente
            //subtituir para test.ligacoes[i].ligacoes2.length
            //redeSocial.ligacoesDto[i].ligacoesRecursivasDto.length
            for (let j = 0; j < redeSocial.ligacoesDto[i].ligacoesRecursivasDto.length; j++) { //amigos de amigos
                cos1 = Math.cos(angle1);
                sin1 = Math.sin(angle1);
                //let radius0 = getRandomArbitrary(1.5, 3);
                //subtituir para test.ligacoes[i].ligacoes2[j].nome
                //redeSocial.ligacoesDto[i].ligacoesRecursivasDto[j].nomeJogador
                const directNodes2 = new No(redeSocial.ligacoesDto[i].ligacoesRecursivasDto[j].nomeJogador, new THREE.Vector3(radius0 * cos1, radius0 * sin1, 0.1), 0.25, 0x999999, 0xffffff, 0x56fa4, 0xcccccc, 0xffffff, 0xff0000);
                angle1 += angleIncrement2;

                scene.add(directNodes2.object);
                if (sin == 0.0 || cos == -1.0) {
                    const edge2 = new Edge('', new THREE.Vector3((radius * cos) / 2, (radius * sin), 0.0), new THREE.Vector3((radius0 * cos1) - (radius * cos) / 2, radius0 * sin1, 0.0), 0.25, 0x999999, 0xffffff, 0x333333, 0xcccccc, 0xffffff, 0xff0000)
                    scene.add(edge2.object);
                } else {
                    const edge2 = new Edge('', new THREE.Vector3((radius * cos) / 2, (radius * sin) / 2, 0.0), new THREE.Vector3((radius0 * cos1) - (radius * cos) / 2, (radius0 * sin1) - (radius * sin) / 2, 0.0), 0.25, 0x999999, 0xffffff, 0x333333, 0xcccccc, 0xffffff, 0xff0000)
                    scene.add(edge2.object);
                }

            }

            angle += angleIncrement;
            scene.add(directNodes.object);
        }
        const animate = () => {
            requestAnimationFrame(animate);

            orbit.update();
            renderer.setViewport(0, 0, canvas.width, canvas.height);
            renderer.clear();


            renderer.render(scene, cameraPrincipal.camera);
            renderer.setViewport(canvas.width - 210, canvas.height - 480, 200, 200);

            renderer.clearDepth();

            renderer.render(scene, cameraMinimap.cameraMinimapObject);

            renderer.render(molduraMinimap.scene2D, molduraMinimap.camera2D);

        }

        animate();

        return () =>{ 
            if(mountRef.current){
                mountRef.current.removeChild(canvas);
            }
            
        }

    }, [redeSocial]);

    return (
        <>
            <Box mt ={10} mb={3}>
                <h2>Escolha o nível de vizualização!</h2>
                <TextField
                    onChange={handleChange}
                    placeholder="1"
                />
                <Button onClick={handleSubmit}>Submit</Button>
            </Box>

            <div ref={mountRef} id='parent'></div>

        </>
    )


}

export default VisualizarRedeSocial