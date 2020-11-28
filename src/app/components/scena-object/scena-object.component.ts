import { WebSocketService } from './../../services/websocket.service';
import { Component, OnInit } from '@angular/core';
import * as THREE from './../../../assets/js/three.js';
import { CubeCamera, Mesh, WebGLRenderer } from 'three';

@Component({
  selector: 'app-scena-object',
  templateUrl: './scena-object.component.html',
  styleUrls: ['./scena-object.component.css']
})

export class ScenaObjectComponent implements OnInit {

  largoCubo   = 1;
  alturaCubo  = 1;
  ampladaCubo = 1;
  colorCubo = "#fff";
  rotacionXCubo = 0.01;
  rotacionYCubo = 0.01;
  animacion = true;
  constructor(private webSocketService: WebSocketService) { }
  
  scene

  ngOnInit() {
    this.scene = new THREE.Scene();
    this.webSocketService.createObservableSocket('ws://192.168.1.203:8999').subscribe(data => {
      this.updateValues(data)            
    })

    console.log(this.largoCubo)
    
    
  }

  onChange(type: string, updatedValue : string) {
    this.webSocketService.sendMessage(type + "=" + updatedValue)
  }

  updateValues(data){
    let obj = JSON.parse(data);
    console.log(obj)
    this.largoCubo   = parseInt(obj.Llargada);
    this.alturaCubo  = parseInt(obj.Altura);
    this.ampladaCubo = parseInt(obj.Amplada);
    this.colorCubo   = obj.Color;
    this.rotacionXCubo = parseFloat(obj.RotacioX);
    this.rotacionYCubo = parseFloat(obj.RotacioY);;
    this.animacion = obj.Animacio;

    console.log(this.colorCubo)

    //Objecto div donde se colocara el canvas
    const container = document.getElementById( 'canvas' );
    //Elementos de la escena. Tambien definimos los parametros de la camara.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //Definimos el render de la web. El tamaño sera todo lo posible de largo y limitado a lo alto.
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( (window.innerWidth / 2), (window.innerHeight / 2) );
    //Colocar la camara dentro del div 'canvas'
    container.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry(this.largoCubo, this.alturaCubo, this.ampladaCubo);
    const material = new THREE.MeshBasicMaterial( { color: this.colorCubo } );
    const cube = new THREE.Mesh( geometry, material );
    cube.name = "cubo"

    scene.add( cube );

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    };

    animate();
  }
  
}