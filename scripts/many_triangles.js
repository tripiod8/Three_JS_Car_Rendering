import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 1, 1)


const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)



const colors = [
    0xff0000,
    0x00ff00,
    0x0000ff
]

function getRandomArbitrary(min, max) 
{
    return Math.random() * (max - min) + min;
}

const createVertex = () => {
    const positionArray = new Float32Array(9)
    for (let i = 0; i < 9; i++) {
        positionArray[i] = Math.random() * .5
    }

    const positionBuffer = new THREE.BufferAttribute(positionArray, 3)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', positionBuffer)
    const material = new THREE.MeshBasicMaterial({
        color: colors[Math.round(getRandomArbitrary(0, 2))],
        wireframe: true
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
}

for (let i = 0; i < 50; i++) {
    createVertex()
    
}


const controls = new OrbitControls(camera, canvas)

renderer.render(scene, camera)

const loop = () => {
    window.requestAnimationFrame(loop)
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
}

loop()

window.addEventListener('dblclick', () => {
    canvas.requestFullscreen()
})