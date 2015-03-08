/*
Setup Three.js WebGL renderer
*/
var renderer = new THREE.WebGLRenderer( { antialias: true } );

/*
Append the canvas element created by the renderer to document body element.
*/
document.body.appendChild( renderer.domElement );

/*
Create a Three.js scene
*/
var scene = new THREE.Scene();

/*
Create a Three.js camera
*/
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0, 10000 );

/*
Apply VR headset positional data to camera.
*/
var controls = new THREE.VRControls( camera );

/*
Apply VR stereo rendering to renderer
*/
var effect = new THREE.VREffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );


/*============= START OF SCENE SETUP CODE =============*/

/*
Create 3d objects
*/
var geometry = new THREE.BoxGeometry( 2, 2, 2 );

var material = new THREE.MeshNormalMaterial();

// Number of objects to place per row
var perRow = 12;
// Get angle between objects
var angle = ( 2 * Math.PI ) / perRow;

for ( var i = 0; i < 120; i++ ) {

    var object = new THREE.Mesh( geometry, material );

    // Get objects row
    var row = Math.floor( i / perRow );

    // Set X and Z such that boxes make ring around origin
    object.position.x = Math.cos( angle * ( i % perRow ) ) * 6;
    object.position.z = Math.sin( angle * ( i % perRow ) ) * 6;
    // Offset Y so camera is staring at middle row
    object.position.y = ( row - 6 ) * 4;

    // Compensate for position and rotate back towards origin
    object.rotation.y = ( Math.PI / 2 ) - ( angle * ( i % perRow ) );

    // Scale object to magaziney shape
    object.scale.x = 1;
    object.scale.y = 1.6;
    object.scale.z = 0.1;

    // Add object to scene
    scene.add( object );

}

/*============= END OF MOCKUP-RELATED CODE =============*/
/*
Request animation frame loop function
*/
function animate() {
    /*
    Apply rotation to cube mesh
    */
    //cube.rotation.y += 0.01;

    /*
    Update VR headset position and apply to camera.
    */
    controls.update();

    /*
    Render the scene through the VREffect.
    */
    effect.render( scene, camera );

    requestAnimationFrame( animate );
}

/*
Kick off animation loop
*/
animate();

/*
Listen for double click event to enter full-screen VR mode
*/
document.body.addEventListener( 'dblclick', function() {
    effect.setFullScreen( true );
});

/*
Listen for keyboard events to zero positional sensor or enter full-screen VR mode.
*/
function onkey(event) {

if (!(event.metaKey || event.altKey || event.ctrlKey)) {
        event.preventDefault();
    }

if (event.charCode == 'z'.charCodeAt(0)) { // z
    controls.zeroSensor();
} else if (event.charCode == 'f'.charCodeAt(0)) { // f
    effect.setFullScreen( true );
}
};

window.addEventListener("keypress", onkey, true);

/*
Handle window resizes
*/
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    effect.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize, false );