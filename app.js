var scene;
var camera;
var cube;
var renderer;
var controls;

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

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 4;

  // Set up trackball.
  controls = new THREE.TrackballControls(camera);

  // Create a renderer with Antialiasing
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
};

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

function draw() {
  // Create a Cube Mesh with basic material
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
  cube = new THREE.Mesh( geometry, material );

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
