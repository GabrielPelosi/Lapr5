import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'


export default class Camera3D {
    constructor(camera) {
        controls = new FirstPersonControls(camera)
        controls.lookSpeed = 0.5;
        controls.lookVertical = true;
        controls.activeLook = true;
        controls.movementSpeed = 50;
        orbitEnabled = false;
        firstPersonEnabled = true;
    }
}