import * as THREE from "three";

export default class Camera3D {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(55, 15, -20);
    }
}