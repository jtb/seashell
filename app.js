var scene;
var camera;
var cube;
var renderer;
var controls;
var gui;
var options;
var box;
var geometry;

window.onload = function() {
  init();
  draw();
  render();
};

// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

function init() {
  // Create an empty scene
  scene = new THREE.Scene();

  // Add GUI for parameters
  //gui = new dat.gui.GUI({
  //  height : 5 * 32 - 1
  //});
  gui = new dat.gui.GUI();
  box = gui.addFolder('Cube');
  //params = {
  //   width: 200
  //};
  options = {
      blah: 2.25,
      reset: function() {
	  //this.velx = 0.1;
	  //this.vely = 0.1;
	  //camera.position.z = 4;
	  //camera.position.x = 10;
	  //camera.position.y = 0;
          controls.reset();
	  cube.scale.x = 1;
	  cube.scale.y = 1;
	  cube.scale.z = 1;
	  cube.material.wireframe = false;
      }
  };
  gui.add(options, 'reset');

  //gui.add(params, 'width').min(128).max(256).step(16);

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 4;

  // Create a renderer with Antialiasing
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );

  // Helper for resizing window
  THREEx.WindowResize(renderer, camera);

  // Set up trackball.
  //controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls = new THREE.OrbitControls( camera, renderer.domElement );

};

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

function draw() {
  // Create a Cube Mesh with basic material
  //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  geometry = new THREE.ParametricGeometry(THREE.SpiralGeometries.mobius4d(options.blah), 20, 20);
  var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
  cube = new THREE.Mesh( geometry, material );

  box.add(cube.scale, 'x', 0, 3).name('Width').listen();
  box.add(cube.scale, 'y', 0, 3).name('Height').listen();
  box.add(cube.scale, 'z', 0, 3).name('Length').listen();
  box.add(cube.material, 'wireframe').listen();
  box.add(options, 'blah', 0, 3).name('blah').onChange(generateGeometry);
  box.open();

  // Add cube to Scene
  scene.add( cube );
};

// Render Loop
function render() {
  controls.update();
  requestAnimationFrame( render );

  cube.rotation.x += 0.003;
  cube.rotation.y += 0.003;

  // Render the scene
  renderer.render(scene, camera);
};


function generateGeometry() {
    // console.log(cube);
    geometry = new THREE.ParametricGeometry(THREE.SpiralGeometries.mobius4d(options.blah), 20, 20);
    cube.geometry.dispose();
    cube.geometry = geometry;
};
 