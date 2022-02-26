import * as THREE from "three";

export default class LuzFixa {
    constructor(posicaoX,posicaoY,posicaoZ) {

        this.light = new THREE.PointLight(0xffffff, 0.5, 10);
        light.position.set(posicaoX, posicaoY, posicaoZ);


    }
}