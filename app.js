var scene;
var camera;
var cube;
var mesh2;
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
      a: 10,
      b: 10,
      A: 45,
      W: 1.52,
      beta: 11,
      whorls: 10,
      reset: function() {
	  //this.velx = 0.1;
	  //this.vely = 0.1;
	  //camera.position.z = 4;
	  //camera.position.x = 10;
	  //camera.position.y = 0;
          controls.reset();
	  //cube.scale.x = 1;
	  //cube.scale.y = 1;
	  //cube.scale.z = 1;
	  cube.material.wireframe = false;
	  this.a =  10;
	  this.b = 10;
	  this.A = 45;
	  this.W = 1.52;
	  this.beta = 11;
	  this.whorls = 10;
          generateGeometry();
      }
  };
  gui.add(options, 'reset');

  //gui.add(params, 'width').min(128).max(256).step(16);

  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 100;

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
  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 2;

};

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

function draw() {
  // Create a Cube Mesh with basic material
  //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  //geometry = new THREE.ParametricGeometry(THREE.SpiralGeometries.mobius4d(options.blah), 20, 20);
  geometry = new THREE.ParametricGeometry(
    THREE.SpiralGeometries.seashell(
      ellipse(options.a, options.b),
      options.A,
      options.W,
      options.beta,
      options.whorls
    ),
    100, 20);

  var texture = new THREE.TextureLoader().load( 'myshell.jpeg' );
  var texture2 = new THREE.TextureLoader().load( 'pearl.jpg' );
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(20,2);
  texture.offset.set(.07, .17);
  var material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.BackSide } );
  var material2 = new THREE.MeshLambertMaterial( { map: texture2, side: THREE.FrontSide } );

  //var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
  cube = new THREE.Mesh( geometry, material );
  mesh2 = new THREE.Mesh( geometry, material2 );
  //var group = new THREE.Group();

  //group.add(mesh1);
  //group.add(mesh2);

  //box.add(cube.scale, 'x', 0, 3).name('Width').listen();
  //box.add(cube.scale, 'y', 0, 3).name('Height').listen();
  //box.add(cube.scale, 'z', 0, 3).name('Length').listen();
  box.add(cube.material, 'wireframe').listen();
  box.add(options, 'a', 1, 20).name('a').onChange(generateGeometry).listen();
  box.add(options, 'b', 1, 20).name('b').onChange(generateGeometry).listen();
  box.add(options, 'A', 1, 90).name('A').onChange(generateGeometry).listen();
  box.add(options, 'W', 1, 200).name('W').onChange(generateGeometry).listen();
  box.add(options, 'beta', 1, 90).name('beta').onChange(generateGeometry).listen();
  box.add(options, 'whorls', 1, 20).name('whorls').onChange(generateGeometry).listen();
  box.open();

  // Add cube to Scene
  scene.add( cube );
  scene.add( mesh2 );

  // Add lighting
  var light = new THREE.HemisphereLight(  0x404040,  0x404040, 3 );
  scene.add( light );
};

// Render Loop
function render() {
  controls.update();
  requestAnimationFrame( render );

  //cube.rotation.x += 0.003;
  //cube.rotation.y += 0.003;

  // Render the scene
  renderer.render(scene, camera);
};


function generateGeometry() {
    // console.log(cube);
    //geometry = new THREE.ParametricGeometry(THREE.SpiralGeometries.mobius4d(options.blah), 20, 20);
    geometry = new THREE.ParametricGeometry(
      THREE.SpiralGeometries.seashell(
        ellipse(options.a, options.b),
        options.A,
        options.W,
        options.beta,
        options.whorls
      ),
      100, 20);
    cube.geometry.dispose();
    cube.geometry = geometry;
    mesh2.geometry.dispose();
    mesh2.geometry = geometry;
};
 