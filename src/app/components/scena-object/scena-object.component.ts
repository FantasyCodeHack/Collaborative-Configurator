import { Component, OnInit } from '@angular/core';
import * as THREE from './../../../assets/js/three.js';

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
  constructor() { }

  ngOnInit() {
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

  onSubmit() {

  }
}
 /*
 import { Component, OnInit } from '@angular/core';
import * as THREE from './../../../assets/js/three.js';

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

  scene;
  camera;
  renderer;
  geometry;
  material;
  cube;

  constructor() { }

  ngOnInit() {
    //Objecto div donde se colocara el canvas
    const container = document.getElementById( 'canvas' );
    //Elementos de la escena. Tambien definimos los parametros de la camara.
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //Definimos el render de la web. El tamaño sera todo lo posible de largo y limitado a lo alto.
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( (window.innerWidth / 2), (window.innerHeight / 2) );
    //Colocar la camara dentro del div 'canvas'
    container.appendChild( this.renderer.domElement );

    this.geometry = new THREE.BoxGeometry(this.largoCubo, this.alturaCubo, this.ampladaCubo);
    this.material = new THREE.MeshBasicMaterial( { color: this.colorCubo } );
    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.cube );

    this.camera.position.z = 5;

    this.animate();
  }

  onSubmit() {

  }

  animate() {
    requestAnimationFrame( this.animate );

    this.cube.rotation.x += this.rotacionXCubo;
    this.cube.rotation.y += this.rotacionYCubo;

    this.renderer.render( this.scene, this.camera );
  }
}*/