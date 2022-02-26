import * as THREE from "three";

export default class LuzAmbiente {
    constructor() {
        this.light2 = new THREE.AmbientLight(0x404040);
    }
}