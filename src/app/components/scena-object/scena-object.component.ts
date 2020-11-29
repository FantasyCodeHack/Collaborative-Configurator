import { WebSocketService } from './../../services/websocket.service';
import { Component, OnInit } from '@angular/core';
import * as THREE from './../../../assets/js/three.js';
import { CubeCamera, Mesh, WebGLRenderer } from 'three';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-scena-object',
  templateUrl: './scena-object.component.html',
  styleUrls: ['./scena-object.component.css']
})

export class ScenaObjectComponent implements OnInit {

  largoCubo   = 1;
  alturaCubo  = 1;
  ampladaCubo = 1;
  colorCubo   = "#fff";
  animacion   = true;
  clients     = 0;

  fabricLargoCubo   = 1;
  fabricAlturaCubo  = 1;
  fabricAmpladaCubo = 1;
  fabricColorCubo   = "#fff";
  fabricAnimacion   = true;
  fabricClients     = 0;

  enable_rollback = false

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
    this.animacion   = obj.Animacio;
    this.clients     = obj.clients;

    this.deleteCanvas();

    //Objecto div donde se colocara el canvas
    const container = document.getElementById( 'canvas' );
    //Elementos de la escena. Tambien definimos los parametros de la camara.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //Definimos el render de la web. El tamaño sera todo lo posible de largo y limitado a lo alto.
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( (window.innerWidth / 2), (window.innerHeight / 2) );
    //Colocamos id al canvas de la animación
    renderer.domElement.id = 'canvasCubo';
    //Colocar la camara dentro del div 'canvas'
    container.appendChild( renderer.domElement );
    //Aplicar estilos
    document.getElementById('canvasCubo').style.border = "5px solid #fff";
    document.getElementById('canvasCubo').style.borderRadius = "20px";

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

    if(this.getValueOfAnimate()){
      animate();
    }else{
      renderer.render( scene, camera );
    }
  }
  
  getValueOfAnimate(){
    return this.animacion
  }

  deleteCanvas(){
    var i
    const canvas = document.getElementById('canvas').children; 
    for(i = 0; i < canvas.length; i++){
      canvas[i].remove();
    }
  }

  fabrica() {
    this.onChange("Llargada", String(this.fabricLargoCubo));
    this.onChange("Altura", String(this.fabricAlturaCubo));
    this.onChange("Amplada", String(this.fabricAmpladaCubo));
    this.onChange("Color", String(this.fabricColorCubo));
    this.onChange("Animacio", String(this.fabricAnimacion));
  }

}