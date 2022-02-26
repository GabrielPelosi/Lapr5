

import * as THREE from "three";

export default class Edge {
    constructor(name, center, center2 , radius = 0.3, nameBackgroundColor = 0xffffff, nameForegroundColor = 0x000000, dialColor = 0x000000, markersColor = 0xffffff, handsHMColor = 0xffffff, handSColor = 0xff0000, width=1) {
        

        // Create the watch (a dial, sixty markers, an hour hand, a minute hand and a second hand)

        // Create a group of objects
        this.object = new THREE.Group();

        /* To-do #1 - Create the dial (a circle) with properties defined by the following parameters and constant:
            - radius: radius
            - segments: 64
            - color: dialColor

            - follow the instructions in this example to create the circle: https://threejs.org/docs/api/en/geometries/CircleGeometry.html */

        //let radius_node = 0.18;
        //let geometry  = new THREE.CircleGeometry(radius_node,64);
        //let material = new THREE.MeshBasicMaterial({ color: dialColor });
         //this.object.dial = new THREE.Mesh(geometry,material);
        //this.object.add(this.object.dial); 
        


        /* To-do #2 - Create the sixty markers (sixty line segments) as follows:
            - start by considering three imaginary circles centered on the origin of the coordinate system, with radii defined by the following parameters: radius0, radius1 and radius2
            - each of the twelve main markers is a line segment connecting a point on the first circle to the corresponding point on the third
            - the remaining markers are line segments connecting points on the second circle to the equivalent points on the third
            - the segments color is defined by parameter markersColor
            - use a for () loop
            - use the parametric form of the circle equation to compute the points coordinates:
                x = r * cos(t) + x0
                y = r * sin(t) + y0
                z = z0;

                where:
                - (x, y, z) are the point coordinates
                - (x0, y0, z0) = (0.0, 0.0, 0.0) are the center coordinates
                - r is the radius
                - t is a parametric variable in the range 0.0 <= t < 2.0 * π (pi)
            - don't forget that angles must be expressed in radians (180.0 degrees = π radians)
            - follow the instructions in this example to create the line segments: https://threejs.org/docs/api/en/objects/Line.html
            - note, however, that instead of making use of class Line you should use class LineSegments: https://threejs.org/docs/api/en/objects/LineSegments.html
            */
        
        
        const radius0 = 0.85 * radius;
        const radius1 = 0.90 * radius;
        const radius2 = 0.95 * radius; 
        var angle = 0;
        var angle2 = 2 * Math.PI / 60;

        let points = [];
        /*
        for(let i = 0; i< 60; i++){
            let x,y,r;
            if(i % 5){
                r=radius1;
            }else{
                r=radius0;
            }
            x=r * Math.cos(angle);
            y=r * Math.sin(angle);
            points.push( new THREE.Vector3(x,y,0))

            x=radius2 * Math.cos(angle);
            y=radius2 * Math.sin(angle);
            points.push( new THREE.Vector3(x,y,0))

            angle+=angle2;
        }
        geometry = new THREE.BufferGeometry().setFromPoints(points);
        material = new THREE.LineBasicMaterial({color:markersColor});
        let markers = new THREE.LineSegments(geometry, material);
        this.object.add(markers);
        */ 

        /* To-do #3: Create the hour hand (a line segment)
        with length 0.5 * radius, pointing at 0.0 radians 
        (the positive X-semiaxis) and color handsHMColor
       */

        

        points = [center, center2];
        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        let material = new THREE.LineBasicMaterial({color:markersColor, linewidth:width});
        this.object.handH = new THREE.LineSegments(geometry,material);
        this.object.add(this.object.handH); 
        

        /* To-do #4: Create the minute hand (a line segment) with length 0.7 * radius, pointing at 0.0 radians (the positive X-semiaxis) and color handsHMColor
        points = [...];
        geometry = new THREE.BufferGeometry()...;
        this.object.handM = new THREE.LineSegments(...);
        this.object.add(this.object.handM); */

        // Create the second hand (a line segment and a circle) pointing at 0.0 radians (the positive X-semiaxis)

        // Create a subgroup of objects
        this.object.handS = new THREE.Group();

        // Create the line segment
        points = [new THREE.Vector3(0.0, 0.0, 0.0), new THREE.Vector3(0.8 * radius, 0.0, 0.0)];
        geometry = new THREE.BufferGeometry().setFromPoints(points);
        material = new THREE.LineBasicMaterial({ color: handSColor });
        let handS = new THREE.LineSegments(geometry, material);
        //this.object.handS.add(handS);

        // Create the circle
        //geometry = new THREE.CircleGeometry(0.01 * radius, 16);
        //material = new THREE.MeshBasicMaterial({ color: handSColor });
        //handS = new THREE.Mesh(geometry, material);
        //this.object.handS.add(handS);

        //this.object.add(this.object.handS);

        // Set the watch position
        this.object.position.set(center.x, center.y, center.z);

        // Create one HTML <div> element

        // Start by getting a 'parent' <div> element with the top-left corner at the center of the viewport (the origin of the coordinate system)
        const parent = document.getElementById('parent');

        // Then create a 'label' <div> element and append it as a child of 'parent'
        this.label = document.createElement('div');
        this.label.style.position = 'absolute';
        this.label.style.left = (50.0 * center.x - 30.0 * radius).toString() + 'vmin';
        this.label.style.top = (-60.0 * center.y + 54.0 * radius).toString() + 'vmin';
        this.label.style.width = (60.0 * radius).toString() + 'vmin';
        this.label.style.fontSize = (8.0 * radius).toString() + 'vmin';
        this.label.style.backgroundColor = '#' + new THREE.Color(nameBackgroundColor).getHexString();
        this.label.style.color = '#' + new THREE.Color(nameForegroundColor).getHexString();
        //this.label.innerHTML = name; /*this.cities[this.cityIndex].name;*/
        parent.appendChild(this.label);
    }
}