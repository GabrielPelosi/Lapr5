import * as THREE from "three";

export default class LuzCameraFixa {
    constructor() {

        this.flashlight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2);
        this.flashlight.shadow.mapSize.width = 512;
        this.flashlight.shadow.mapSize.height = 512;
        this.flashlight.shadow.camera.near = 10;
        this.flashlight.shadow.camera.far = 200;
        this.flashlight.shadow.focus = 1;
        this.flashlight.castShadow = true;
        this.flashlight.target = camera;
        this.flashlight.position.set(0, 0, 2);

    }
}