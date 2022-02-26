import * as THREE from "three";
//import {GUI} from '../three/examples/jsm/libs/dat.gui.module.js';

export default class PickHelper {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.pickedObject = null;
      this.intersected=null;
    }
    pick(normalizedPosition, scene, camera, jog) {
      // restore the color if there is a picked object
      //if (this.pickedObject) {
        //this.pickedObject.material.emissive.setHex(0);
        //this.pickedObject = undefined;
      //}
   
      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);

      const intersectedObjects = this.raycaster.intersectObjects(scene.children, true);
      

      if (intersectedObjects.length ) {
       
        if(intersectedObjects[0].object!=this.pickedObject && intersectedObjects[0].object.geometry.type != "BufferGeometry"){

          if(intersectedObjects[0].object.geometry.type == "SphereGeometry"){

            this.pickedObject = intersectedObjects[0].object;

         
            for(let x=0; x<jog.length;x++){

          
              if(jog[x].position.equals(this.pickedObject.position)){
                var string="";


                var canvas1 = document.createElement('canvas');
                var context1 = canvas1.getContext('2d');
                //var message = string;
                //var metrics = context1.measureText(message);
                //var width = metrics.width;

               
                context1.font = "Bold 20px Arial";
                context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                context1.fillRect( 0,0, 200,jog[x].nome.length*20+2);
                context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                context1.fillRect( 2,2, 196,jog[x].nome.length*20-2);
                context1.fillStyle = "rgba(0,0,0,1)"; // text color
                //context1.fillText(message, 4, 20);
                //context1.fillText(message, 4, 40);

                for(let y=0;y<jog[x].nome.length;y++){
                  string=jog[x].nome[y].value;
                  //string+=";"
                  context1.fillText(string, 4, (y*20)+20);
                }
                
                  // create a canvas element
                  
                    
                  // canvas contents will be used for a texture
                  var texture1 = new THREE.Texture(canvas1) 
                  texture1.needsUpdate = true;
                  
                  var spriteMaterial = new THREE.SpriteMaterial( { map: texture1, useScreenCoordinates: true } );
                  
                  var sprite1 = new THREE.Sprite( spriteMaterial );
                  sprite1.scale.set(40,20,5);
                  sprite1.position.set( this.pickedObject.position.x+10, this.pickedObject.position.y+(2*jog[x].nome.length), this.pickedObject.position.z );
                  
                  scene.add(sprite1);
                  
                } 
              }
        }
      }
    }
    }
  }