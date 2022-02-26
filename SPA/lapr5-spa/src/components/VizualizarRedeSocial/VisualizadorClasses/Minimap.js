
import * as THREE from "three";

export default class Minimap {
    constructor() {

        this.cameraMinimapObject = new THREE.OrthographicCamera(5, -5, 5, -5, 3, 10);
        this.cameraMinimapObject.position.z = -4
        this.cameraMinimapObject.position.y = 0
        this.cameraMinimapObject.position.x = 0
        this.cameraMinimapObject.lookAt(new THREE.Vector3(0, 0, 0))

    }
}