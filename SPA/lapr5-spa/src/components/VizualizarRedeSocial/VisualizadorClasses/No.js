

import * as THREE from "three";

export default class No {
    constructor(name, center = new THREE.Vector3(0.0, 0.0, 0.0), radius = 0.3, nameBackgroundColor = 0xffffff, nameForegroundColor = 0x000000, dialColor = 0x000000, markersColor = 0xffffff, handsHMColor = 0xffffff, handSColor = 0xff0000) {

        this.object = new THREE.Group();


        let radius_node = 0.06;
        let geometry = new THREE.CircleGeometry(radius_node, 64);
        let material = new THREE.MeshBasicMaterial({ color: dialColor });
        this.object.dial = new THREE.Mesh(geometry, material);
        this.object.add(this.object.dial);


        let points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(450, -800, 0)];
        geometry = new THREE.BufferGeometry();
        material = new THREE.LineBasicMaterial();
        this.object.handH = new THREE.LineSegments();
        this.object.add(this.object.handH);


        this.object.handS = new THREE.Group();

        //points = [new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(0.8 * radius, 0.0, 0.0)];
        //geometry = new THREE.BufferGeometry().setFromPoints(points);
        //material = new THREE.LineBasicMaterial({ color: handSColor });
        let handS = new THREE.LineSegments(geometry, material);
        //this.object.handS.add(handS);

       
        this.object.position.set(center.x, center.y, center.z);


        const message = name;
        const parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 12;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : { r: 255, g: 255, b: 255, a: 1.0 };
        var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        var metrics = context.measureText(message);
        var textWidth = metrics.width;

        context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        //roundRect(context, borderThickness / 2, borderThickness / 2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);

        context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
        context.fillText(message, borderThickness, fontsize + borderThickness);

        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: false });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.1 * fontsize, 0.1 * fontsize, 0.3 * fontsize);
        sprite.center.set(0.1,0.91)
        this.object.add(sprite);

       
    }

}