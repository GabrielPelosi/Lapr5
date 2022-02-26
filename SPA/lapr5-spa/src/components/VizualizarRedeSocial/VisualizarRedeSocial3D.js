import React from "react";
import * as THREE from "three";
import './VisualizarRedeSocial3D.css'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Minimap from './VisualizadorClasses/Minimap'
import axios from 'axios'
import { BASE_URL_MDRS } from '../../apis/BaseUrl'
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { getIdJogadorAutenticado } from '../../utils/JogadorIDLocalStorage'
import { test } from '../../utils/testesLocaisParaVizualizacao'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import PickHelper from './VisualizadorClasses/PickHelper'
let scene, renderer, orbit, angle, angle1, cos, sin, cos1, sin1;

let canvas;

let camera, controls, clock, cameraMinimap, label, flash,rain, rainGeo, rainCount = 15000;;

let geoIntersect = [];

const objects = [];

let raycaster;



let orbitEnabled = true;
let firstPersonEnabled = false;
var cloudParticles = [];

const vertex = new THREE.Vector3();
const color = new THREE.Color();


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getMood(mood) {
    let em;
    if(mood==="Alegre"){
        em='/textures/heart.png'
    }else if(mood==="Angustiado"){
        em='/textures/darkcloud.png'
    }else if(mood==="Aliviado"){
        em='/textures/aliviado.png'
    }else if(mood==="Arrependido"){
        em='/textures/arrependido.png'
    }else if(mood==="Decepcionado"){
        em='/textures/Raio.png'
    }else if(mood==="Esperançoso"){
        em='/textures/sol.png'
    }else if(mood==="Grato"){
        em='/textures/grato.png'
    }else if(mood==="Medo"){
        em='/textures/terror.png'
    }else if(mood==="Nervoso"){
        em='/textures/nervoso.png'
    }else if(mood==="Orgulhoso"){
        em='/textures/orgulhoso.png'
    }
    return em
}




const VisualizarRedeSocial3D = () => {

    const [nivel, setNivel] = React.useState('2');
    const mountRef = React.useRef();
    const User_ID = getIdJogadorAutenticado();


    const [redeSocial, setRedeSocial] = React.useState(
        {

            nomeJogador: "Nó Central",
            ligacoesDto: [

            ],
            mood: "sem_estado",
            tags: [],
            avatar: ""
        }
    );

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

    const handleSubmit = async () => {
        await axios.get(`${BASE_URL_MDRS}/api/Jogadores/rede-social/${nivel}/${User_ID}`)
            .then(response => {
                setRedeSocial(response.data)
            }).catch(err => {
                alert(err.message)
            })
    }

    const handleChange = (event) => {
        event.preventDefault();
        setNivel(event.target.value)
    }
    /*function draw(p1,p2){
        var mat = new THREE.LineBasicMaterial({color:0x888888})
        var geo = new THREE.Geometry()
        geo.vertices.push( new THREE.Vertex(p1) )
        geo.vertices.push( new THREE.Vertex(p2) )
        var line = new THREE.Line(geo)
        scene.add(line)
       return line
    }*/


    React.useEffect(() => {


        //scene.background = new THREE.Color(0xffffff);
        //scene.fog = new THREE.Fog(0xffffff, 0, 750);


        //Escolher qual luz usar pois afeta cores da esfera



        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth - 10, window.innerHeight - 65);
        renderer.autoClear = false;
        renderer.setClearColor(new THREE.Color(0xffffff), 1);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        canvas = renderer.domElement;
        mountRef.current.appendChild(canvas);

        cameraMinimap = new Minimap();
        clock = new THREE.Clock(true)
        camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 1, 1000);
        camera.position.set(-54, 25, 16);
        camera.lookAt(50, 5, -10)


        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xd3d3d3, 0.002);
        renderer.setClearColor(scene.fog.color);

        scene.add(camera);

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


        orbit = new OrbitControls(camera, canvas)
        orbit.enableRotate = true;
        orbit.enablePan = true;
        orbit.enableZoom = true;
        orbit.maxPolarAngle = Math.PI / 2;
        orbit.target = new THREE.Vector3(5, 8, 15);
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
        floor.name = "chao";
        //floor.visible=false;
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
        var spritey = makeTextSprite(redeSocial.nomeJogador,
            {});
        spritey.position.set(sphere.position.x, sphere.position.y + 1, sphere.position.z);
        scene.add(spritey);

        const mood = getMood(redeSocial.mood)

        const loader = new THREE.TextureLoader();

        let texture1 = loader.load(mood);

        const materiall = new THREE.SpriteMaterial({
            map: texture1, transparent: true
        });

        const meshie = new THREE.Sprite(materiall);

        sphere.add(meshie)

        meshie.position.set(0, 10.0, 0)
        meshie.scale.set(5, 5, 2.0);


        objects.push(sphere);
        const angleIncrement = 5 * Math.PI / 60.0;
        const angleIncrement2 = 2.5 * Math.PI / 60.0;
        angle = 0.0;
        angle1 = 0.0;
        const radius = 100;
        const radius0 = 300;
        let x = 0;
        //console.log(redeSocial)
        let pos = new THREE.Vector3(sphere.position.x, sphere.position.y, sphere.position.z)
        const infoJog = [];
        //console.log(redeSocial.mood)
        infoJog.push({ nome: redeSocial.tags, ava: redeSocial.avatar, position: pos });
        /*var no="";
        no+="redeSocial.ligacoesDto";
        //redeSocial.ligacoesDto[i].ligacoesRecursivasDto.length

        let d=0;
        let y=0;
        //no+="[y]"
       // console.log(eval(no))
        //no+=".ligacoesRecursivasDto"
        //console.log(eval("redeSocial.ligacoesDto[y].ligacoesRecursivasDto[y].ligacoesRecursivasDto"))
        const f=[];
        f.push(no)
        console.log(f)
        const temp=[];
        if(redeSocial.ligacoesDto.length>0){
        while(d!=nivel){
            if(typeof eval(no)!="undefined"){
                console.log(no)
                console.log(eval(no+".length"))
                for(let x=0;x<eval(no+".length");x++){
                    if(d>0){
                        for(let h=0;h<f;h++){
                            console.log(eval(no+"[x].nomeJogador"))
                        }
                    }
                    
                    console.log(eval(no+"[x].nomeJogador"))
                    f.push(no+="[x].ligacoesRecursivasDto")
                    console.log(no)
                    //f.push(eval(no+".length"));
                }

                //no+="[f[0]].ligacoesRecursivasDto"
            }
            console.log(f)
            d++;
        }
        }*/
        for (let i = 0; i < redeSocial.ligacoesDto.length; i++) {
            cos = Math.cos(angle);
            sin = Math.sin(angle);
            //let radius = getRandomArbitrary(40, 100);
            angle1 = angle;
            const sphereMaterial2 = new THREE.MeshPhongMaterial({ specular: 0xffffff, flatShading: true, vertexColors: true });
            sphereMaterial2.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            //console.log(redeSocial.ligacoesDto[i])
            const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere2.position.x = radius * sin
            sphere2.position.y = 8;
            sphere2.position.z = radius * cos;
            var spritey = makeTextSprite(redeSocial.ligacoesDto[i].nomeJogador,
                {});
            spritey.position.set(sphere2.position.x, sphere2.position.y + 1, sphere2.position.z);
            scene.add(spritey);
            scene.add(sphere2);
            objects.push(sphere2);

            const mood2 = getMood(redeSocial.ligacoesDto[i].mood)
            const loaderr = new THREE.TextureLoader();

            let texture12 = loaderr.load(mood2);

            const materiall2 = new THREE.SpriteMaterial({ map: texture12 });

            const meshie2 = new THREE.Sprite(materiall2);

            sphere2.add(meshie2)

            meshie2.position.set(0, 10.0, 0)
            meshie2.scale.set(5, 5, 2.0);




            const positions = [];
            positions.push(5, 8, 15);
            positions.push(sphere2.position.x, 8, sphere2.position.z)
            pos = new THREE.Vector3(sphere2.position.x, sphere2.position.y, sphere2.position.z)
            infoJog.push({ nome: redeSocial.ligacoesDto[i].tags, ava: redeSocial.ligacoesDto[i].avatar, position: pos })
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

            let matLineBasic = new THREE.LineBasicMaterial({ vertexColors: false });
            //let matLineDashed = new THREE.LineDashedMaterial( { vertexColors: true, scale: 2, dashSize: 1, gapSize: 1 } );

            const line1 = new THREE.Line(geo, matLineBasic);
            scene.add(line1);

            //const edge1 = new Edge('', new THREE.Vector3(5, 8, 15), new THREE.Vector3(sphere2.position.x, 8, sphere2.position.z), 0.25, 0x999999, 0xffffff, 0x333333,  0xff00ff, 0xffffff, 0xff0000,30)

            for (let j = 0; j < redeSocial.ligacoesDto[i].ligacoesRecursivasDto.length; j++) {
                const sphereMaterial3 = new THREE.MeshPhongMaterial({ specular: 0xffffff, flatShading: true, vertexColors: true });
                sphereMaterial3.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
                //let radius0 = getRandomArbitrary(150, 300);
                cos1 = Math.cos(angle1);
                sin1 = Math.sin(angle1);
                angle1 += angleIncrement2;

                const sphere3 = new THREE.Mesh(sphereGeometry, sphereMaterial);
                sphere3.position.x = radius0 * sin1
                sphere3.position.y = 8;
                sphere3.position.z = radius0 * cos1;

                var spritey = makeTextSprite(redeSocial.ligacoesDto[i].ligacoesRecursivasDto[j].nomeJogador, {});
                spritey.position.set(sphere3.position.x, sphere3.position.y + 1, sphere3.position.z);
                scene.add(spritey);

                scene.add(sphere3);
                objects.push(sphere3);

                const mood3 = getMood(redeSocial.ligacoesDto[i].ligacoesRecursivasDto[j].mood)
                const loaderr3 = new THREE.TextureLoader();

                let texture13 = loaderr3.load(mood3);

                const materiall3 = new THREE.SpriteMaterial({ map: texture13 });

                const meshie3 = new THREE.Sprite(materiall3);

                sphere3.add(meshie3)

                meshie3.position.set(0, 10.0, 0)
                meshie3.scale.set(5, 5, 2.0);




                positions.push(sphere2.position.x, 8, sphere2.position.z);
                positions.push(sphere3.position.x, 8, sphere3.position.z)
                pos = new THREE.Vector3(sphere3.position.x, sphere3.position.y, sphere3.position.z)
                infoJog.push({ nome: redeSocial.ligacoesDto[i].ligacoesRecursivasDto[j].tags, ava: redeSocial.ligacoesDto[i].ligacoesRecursivasDto[j].avatar, position: pos })
                const geo = new THREE.BufferGeometry();
                geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

                let matLineBasic1 = new THREE.LineBasicMaterial({ vertexColors: true });
                let matLineDashed2 = new THREE.LineDashedMaterial({ vertexColors: true, scale: 2, dashSize: 1, gapSize: 1 });

                const line1 = new THREE.Line(geo, matLineBasic1);
                scene.add(line1);


            }
            angle = angle1;
            angle += angleIncrement;

        }


        raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
        raycaster.far = 100;

        const pickPosition = { x: 0, y: 0 };
        clearPickPosition();


        function getCanvasRelativePosition(event) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: (event.clientX - rect.left) * canvas.width / rect.width,
                y: (event.clientY - rect.top) * canvas.height / rect.height,
            };
        }

        function setPickPosition(event) {
            const pos = getCanvasRelativePosition(event);
            pickPosition.x = (pos.x / canvas.width) * 2 - 1;
            pickPosition.y = (pos.y / canvas.height) * -2 + 1;
            // note we flip Y
        }

        function clearPickPosition() {
            // unlike the mouse which always has a position
            // if the user stops touching the screen we want
            // to stop picking. For now we just pick a value
            // unlikely to pick something
            pickPosition.x = -100000;
            pickPosition.y = -100000;
        }

        canvas.addEventListener('mousemove', setPickPosition.bind(this));
        canvas.addEventListener('mouseout', clearPickPosition.bind(this));
        canvas.addEventListener('mouseleave', clearPickPosition.bind(this));


        canvas.addEventListener('touchstart', (event) => {
            // prevent the window from scrolling
            event.preventDefault();
            setPickPosition(event.touches[0]);
        }, { passive: false });

        canvas.addEventListener('touchmove', (event) => {
            setPickPosition(event.touches[0]);
        });

        canvas.addEventListener('touchend', clearPickPosition);



        window.addEventListener('resize', onWindowResize);

        function onWindowResize() {
            renderer.setSize(window.innerWidth - 80, window.innerHeight - 200);

            camera.aspect = canvas.width / canvas.height;
            camera.updateProjectionMatrix();


        }

        let loaderSmoke = new THREE.TextureLoader();
        var cloudGeo;
        var cloudMaterial;
        loader.load('/textures/smoke.png', function (texture) {
            cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
            cloudMaterial = new THREE.MeshLambertMaterial({
                map: texture,
                transparent: true
            });
            for (let p = 0; p < 25; p++) {
                let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
                cloud.position.set(
                    Math.random() * 800 - 400,
                    500,
                    Math.random() * 500 - 450
                );
                cloud.rotation.x = 1.16;
                cloud.rotation.y = -0.12;
                cloud.rotation.z = Math.random() * 360;
                cloud.material.opacity = 0.6;
                cloudParticles.push(cloud);
                scene.add(cloud);
            }
        });

        flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
        flash.position.set(200, 300, 100);
        scene.add(flash);

        rainGeo = new THREE.BufferGeometry();
        for (let i = 0; i < rainCount; i++) {
            const rainDrop = new THREE.Vector3(
                Math.random() * 400 - 200,
                Math.random() * 500 - 250,
                Math.random() * 400 - 200
            );
            rainGeo.setAttribute('position', new THREE.BufferAttribute( rainDrop, 3 ))
            // .vertices.push(rainDrop);
        }

        const rainMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.1,
            transparent: true
        });
        rain = new THREE.Points(rainGeo, rainMaterial);
        scene.add(rain);





        function makeTextSprite(message, parameters) {
            if (parameters === undefined) parameters = {};

            var fontface = parameters.hasOwnProperty("fontface") ?
                parameters["fontface"] : "Arial";

            var fontsize = parameters.hasOwnProperty("fontsize") ?
                parameters["fontsize"] : 32;

            var borderThickness = parameters.hasOwnProperty("borderThickness") ?
                parameters["borderThickness"] : 2;

            var borderColor = parameters.hasOwnProperty("borderColor") ?
                parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

            var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
                parameters["backgroundColor"] : { r: 255, g: 255, b: 255, a: 1.0 };

            //var spriteAlignment = THREE.SpriteAlignment.topLeft;

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            context.font = "Bold " + fontsize + "px " + fontface;

            // get size data (height depends only on font size)
            var metrics = context.measureText(message);
            var textWidth = metrics.width;

            // background color
            context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                + backgroundColor.b + "," + backgroundColor.a + ")";
            // border color
            context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                + borderColor.b + "," + borderColor.a + ")";

            context.lineWidth = borderThickness;
            //roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
            // 1.4 is extra height factor for text below baseline: g,j,p,q.

            // text color
            context.fillStyle = "rgba(0, 0, 0, 1.0)";

            context.fillText(message, borderThickness, fontsize + borderThickness);

            // canvas contents will be used for a texture
            var texture = new THREE.Texture(canvas)
            texture.needsUpdate = true;

            var spriteMaterial = new THREE.SpriteMaterial(
                { map: texture, useScreenCoordinates: false/*, alignment: spriteAlignment*/ });
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(25, 15, 1.0);
            return sprite;
        }



        const pickHelper = new PickHelper();

        function animate() {

            requestAnimationFrame(animate);


            cloudParticles.forEach(p => {
                p.rotation.z -= 0.002;
            });

            if (Math.random() > 0.93 || flash.power > 100) {
                if (flash.power < 100)
                    flash.position.set(
                        Math.random() * 400,
                        300 + Math.random() * 200,
                        100
                    );
                flash.power = 50 + Math.random() * 500;
            }


            //label.lookAt(camera.position);
            if (firstPersonEnabled) {
                controls.update(clock.getDelta());
            } else {
                orbit.update();
            }
            //console.log(scene)

            camera.updateProjectionMatrix()
            pickHelper.pick(pickPosition, scene, camera, infoJog);
            /*if(p!=null && scene.children[13]==null){
                //if(scene.children.getObjectById(p.id))
                    console.log(p)
                    scene.add(p);
                    orbit.update();
                }
*/
            renderer.setViewport(0, 0, canvas.width, canvas.height);
            renderer.clear();

            renderer.render(scene, camera);

            // renderer.setViewport(canvas.width - 210, canvas.height - 480, 200, 200);

            //renderer.clearDepth();

            //renderer.render(scene, cameraMinimap.cameraMinimapObject);


        }
        animate();
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(canvas);
            }

        }


    }, [redeSocial]);


    return (
        <>
            <div className="menu_container">
                <h2>Escolha o nível de visualização!</h2>

                <TextField

                    onChange={handleChange}
                    value={nivel}
                    label={"Nivel"} //optional
                />
                <button onClick={handleSubmit}>Submit</button>
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


export default VisualizarRedeSocial3D