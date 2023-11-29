import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4
scene.add(camera)

window.addEventListener('resize', (event) => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


const coordinates = {
    x: 0,
    y: 0
}

// window.addEventListener('mousemove', (event) => {
//     coordinates.x = (event.clientX / sizes.width) - 0.5
//     coordinates.y = (event.clientY / sizes.height) - 0.5
// })

const loop = () => {
    window.requestAnimationFrame(loop)
    // camera.position.x = Math.sin(coordinates.x * Math.PI) * 3 
    // camera.position.z = Math.cos(coordinates.x * Math.PI) * 3
    // camera.position.y = - (coordinates.y * 3)
    // camera.lookAt(mesh.position)
    controls.update()
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
}
loop()
