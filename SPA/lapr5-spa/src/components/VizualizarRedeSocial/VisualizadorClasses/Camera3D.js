
import * as THREE from "three";

export default class Camera3D {
    constructor() {

        //criar cameras
        const aspectRatio = window.innerWidth / window.innerHeight;

        this.camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 1000 );
        


    }
}