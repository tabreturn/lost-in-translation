import * as THREE from '../../node_modules/three/src/Three.js';
import {VRButton} from '../../node_modules/three/examples/jsm/webxr/VRButton.js';
import {OrbitControls} from  '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import {XRControllerModelFactory} from '../../node_modules/three/examples/jsm/webxr/XRControllerModelFactory.js';
import {TubePainter} from '../../node_modules/three/examples/jsm/misc/TubePainter.js';


let container = document.getElementById('game');
let scene, camera, renderer, light, 
    clock = new THREE.Clock(), mixer, controls, stats, raycaster, 
    plane, textureLoader, texture1, myCamTexture, guestcamTexture,
    viewer, INTERSECTED, group, barGroup,
    viewerMaterial, painter, cursor = new THREE.Vector3(),
    controller1, controller2, controllerGrip1, controllerGrip2,
    colors = [0x0000ff, 0xff0000, 0x00ff00, 0x00ffff],
    bgImages = ['assets/gfx/pano.jpg', 'assets/gfx/lobby.jpg'];

function Init(){
    createWorld();
    createPainter();


    render();
    animate();

    // orbit controller 
    controls = new OrbitControls( camera, container );
    controls.target.set(0, -Math.PI/2, 0);
    controls.update();
}

function createWorld(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);
    camera.layers.enable(0);
    camera.layers.enable(1);
    camera.layers.enable(2);

    textureLoader = new THREE.TextureLoader();

    let viewerGeo = new THREE.SphereBufferGeometry(500, 60, 40);
    viewerGeo.scale(-1, 1, 1);

    // render bg
    texture1 = textureLoader.load(bgImages[0]);
    viewerMaterial = new THREE.MeshBasicMaterial({
        map: texture1
    });
    viewer = new THREE.Mesh(viewerGeo, viewerMaterial);
    viewer.rotation.y = -Math.PI/2;
    scene.add(viewer);

}

function createControllers(){
    controller1 = renderer.xr.getController(0);
    controller1.addEventListener('selectstart', onSelectStart);
    controller1.addEventListener('selectend', onSelectEnd);
    scene.add(controller1);

    controller2 = renderer.xr.getController(1);
    controller2.addEventListener('selectstart', onLeftSelectStart);
    controller2.addEventListener('selectend', onLeftSelectEnd);
    scene.add(controller2);

    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -5 )]);
    const line = new THREE.Line(geometry);
    line.name = 'line';
    line.scale.z = 5;

    controller1.add(line.clone());
    controller2.add(line.clone());

    // controller grips
    var controllerModelFactory = new XRControllerModelFactory();

    controllerGrip1 = renderer.xr.getControllerGrip(0);
    controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
    scene.add(controllerGrip1);

    controllerGrip2 = renderer.xr.getControllerGrip(1);
    controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
    scene.add(controllerGrip2);
}

function createPainter(){
    painter = new TubePainter();
    painter.setSize(0.5);
    painter.mesh.material.side = THREE.DoubleSide;
    painter.mesh.material = new THREE.MeshBasicMaterial({color: colors[Math.floor(Math.random()*colors.length)]});
    
    painter.mesh.layers.set(2);

    scene.add(painter.mesh);
}

function render(){
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    renderer.xr.setFramebufferScaleFactor(2.0);
    container.appendChild(renderer.domElement);
    
    camera.updateMatrixWorld();

    // vr buttons
    document.body.appendChild(VRButton.createButton(renderer));

    // controllers and grips
    createControllers();


}

function animate(){
    requestAnimationFrame(animate);
    renderer.setAnimationLoop(rendering);
}

function rendering (){
    renderer.render(scene, camera);

    handleControllerRight(controller1);
    handleControllerLeft(controller2);
}

function handleControllerRight(controller){
    var userData = controller.userData;
    cursor.set(0, 0, -0.2).applyMatrix4(controller.matrixWorld);

    if(userData.isSelecting === true){
        if(userData.skipFrames >= 0){
            userData.skipFrames--;
            painter.moveTo(cursor);
        }else{
            painter.lineTo(cursor);
            painter.update();
        }
    }

}

function handleControllerLeft(controller){

}


function onSelectStart(){
    painter.mesh.material = new THREE.MeshBasicMaterial({color: colors[Math.floor(Math.random()*colors.length)]});
    this.userData.isSelecting = true;
    this.userData.skipFrames = 2;
}

function onSelectEnd(){
    this.userData.isSelecting = false;
}

function onLeftSelectStart(){
    this.userData.isToggle = true;

}

function onLeftSelectEnd(){
    this.userData.isToggle = false;
    camera.layers.toggle(0);
    console.log(camera.layers);
}

export {Init}