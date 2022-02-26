


export default class WindowResize {
    constructor(camera, renderer) {
        const aspectRatio = window.innerWidth / window.innerHeight;
        if (aspectRatio < 1.0) {
            camera.left = -1.0;
            camera.right = 1.0;
            camera.top = 1.0 / aspectRatio;
            camera.bottom = -1.0 / aspectRatio;
        }
        else {
            camera.left = -aspectRatio;
            camera.right = aspectRatio;
            camera.top = 1.0;
            camera.bottom = -1.0;
        }
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
    }
}