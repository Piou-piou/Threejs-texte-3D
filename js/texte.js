//--------------- CREATION CAMERA, SCENE ... -------------------------/
var container = document.getElementById('ThreeJS');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1, 20000);
var distance = 1000;

if (Detector.webgl) {
	renderer = new THREE.WebGLRenderer( {antialias:true} );
}
else {
	renderer = new THREE.CanvasRenderer(); 
}

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

camera.position.set(0,150,300);
camera.lookAt(scene.position);
scene.add(camera);
//--------------- FIN CREATION CAMERA, SCENE ... -------------------------/

init();
animate();

var textMesh;


function init() {
	//---------------- INITIALISATION DU MONDE 3D ------------------------
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	// FLOOR
	//var floorTexture = new THREE.ImageUtils.loadTexture( 'images/piste.jpg' );
	//floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	//floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshLambertMaterial( { color: 0xcccccc, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(2000, 2000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	floor.receiveShadow = true;
	scene.add(floor);
	// SKYBOX
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 100000, 100000 );
	var skyBoxMaterial = new THREE.MeshLambertMaterial( { color: 0x000000, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	//scene.add(skyBox);
	//---------------- FIN INITIALISATION DU MONDE 3D ------------------------
	
	renderer.shadowMapEnabled = true;
	
	// spotlight #1 -- yellow, dark shadow
	var spotlight = new THREE.SpotLight(0xffffff);
	spotlight.position.set(500,150,500);
	spotlight.shadowCameraVisible = false;
	spotlight.shadowDarkness = 0.95;
	spotlight.intensity = 0.7;
	// must enable shadow casting ability for the light
	spotlight.castShadow = true;
	scene.add(spotlight);
	
	var spotlight1 = new THREE.SpotLight(0x000000);
	spotlight1.position.set(-500,150,500);
	spotlight1.shadowCameraVisible = false;
	spotlight1.shadowDarkness = 0.95;
	spotlight1.intensity = 0.7;
	// must enable shadow casting ability for the light
	//spotlight1.castShadow = true;
	scene.add(spotlight1);
	
	// add 3D text
	var materialFront = new THREE.MeshLambertMaterial( { color: 0x000000 } );
	var materialSide = new THREE.MeshLambertMaterial( { color: 0x000000 } );
	var materialArray = [ materialFront, materialSide ];
	var textGeom = new THREE.TextGeometry( "πlloud", 
	{
		size: 30, height: 4, curveSegments: 3,
		font: "helvetiker", weight: "bold", style: "normal",
		bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
		material: 0, extrudeMaterial: 1
	});
	
	var textMaterial = new THREE.MeshLambertMaterial(materialArray);
	textMesh = new THREE.Mesh(textGeom, textMaterial );
	textMesh.receiveShadow = true;
	textMesh.castShadow = true;
	
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	
	textMesh.position.set( -0.5 * textWidth, 75, 100 );
	//textMesh.rotation.x = -Math.PI / 4;
	scene.add(textMesh);

}







//--------------- CREATION RENDU DE LA SCENE -------------------------/
function animate() {
    requestAnimationFrame( animate );
	textMesh.rotation.x = Date.now() * 0.001;
	textMesh.rotation.y = Date.now() * 0.001;
	render();		
	update();
}

function update(){
	controls.update();
	stats.update();
}

function render() {
	//textMesh.rotation.y = 2*5;
	renderer.render( scene, camera );
}
//--------------- FIN RENDU DE LA SCENE -------------------------/