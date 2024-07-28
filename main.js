import * as THREE from 'three';
import Cube from './Cube.js';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
 
window.addEventListener('mousemove', (event) =>
    {
        cube.mouse.x = event.clientX / sizes.width * 2 - 1
        cube.mouse.y = - (event.clientY / sizes.height) * 2 + 1
    
    })

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
})

window.addEventListener('keydown', (e) =>
{
    if (cube.animating !== -1) return;
    switch (e.key)
    {
        case 'w':
            cube.updateSide(0);
            cube.animating = 0;
            break;
        case 's':
            cube.updateSide(1);
            cube.animating = 1;
            break;
        case 'a':
            cube.updateSide(2);
            cube.animating = 2;
            break;
        case 'd':
            cube.updateSide(3);
            cube.animating = 3;
            break;
        case 'q':
            cube.updateSide(4);
            cube.animating = 4;
            break;
        case 'e':
            cube.updateSide(5);
            cube.animating = 5;
            break;
    }
})


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// add some lights to the scene
const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 5
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 30)
pointLight2.position.x = 0
pointLight2.position.y = 3
pointLight2.position.z = 0
scene.add(pointLight2)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const cube = new Cube(scene, camera);
cube.addtoScene(scene);
camera.position.z = 6;


const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, roughness: 0.3, metalness: 0.9, side: THREE.BackSide 
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() 
{
    cube.update();
	renderer.render( scene, camera );

}
renderer.setAnimationLoop( animate );

