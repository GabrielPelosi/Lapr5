import * as THREE from "three";

export default class Chao {
    constructor() {
        this.object = new THREE.Group();

         // floor

         let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
         floorGeometry.rotateX(- Math.PI / 2);
 
         // vertex displacement
 
         let position = floorGeometry.attributes.position;
 
         for (let i = 0, l = position.count; i < l; i++) {
 
             vertex.fromBufferAttribute(position, i);
 
             vertex.x += Math.random() * 20 - 10;
             vertex.y += Math.random() * 2;
             vertex.z += Math.random() * 20 - 10;
 
             position.setXYZ(i, vertex.x, vertex.y, vertex.z);
 
         }
 
         floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
 
         position = floorGeometry.attributes.position;
         const colorsFloor = [];
 
         for (let i = 0, l = position.count; i < l; i++) {
 
             color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
             colorsFloor.push(color.r, color.g, color.b);
 
         }
 
         floorGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsFloor, 3));
 
         const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });
 
         const floor = new THREE.Mesh(floorGeometry, floorMaterial);
         floor.receiveShadow = true;
    }
}