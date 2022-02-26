import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera3D {
    constructor(camera, canvas) {
        this.orbit = new OrbitControls(camera, canvas)
        this.orbit.enableRotate = true;
        this.orbit.enablePan = true;
        this.orbit.enableZoom = true;
        this.orbit.maxPolarAngle = Math.PI / 2;
    }
}