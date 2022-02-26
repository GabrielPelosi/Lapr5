
import * as THREE from "three";

export default class MolduraMinimap {
    constructor() {

        //criar cameras
        const aspectRatio = window.innerWidth / window.innerHeight;


        if (aspectRatio < 1.0) {
            this.camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0 / aspectRatio, -1.0 / aspectRatio, 0.0, 1.0);
        }
        else {
            this.camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, 1.0, -1.0, 0.0, 1.0);
        }

    }
}