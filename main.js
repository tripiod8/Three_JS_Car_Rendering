import * as THREE from "three"
import { gsap } from "gsap";
console.log(gsap);

const scene = new THREE.Scene()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const group = new THREE.Group()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000
})
const mesh_red = new THREE.Mesh(geometry, material)
mesh_red.position.set(-3, 0, 0)
group.add(mesh_red)

const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({
  color: 0x00ff00
})
const mesh_green = new THREE.Mesh(geometry2, material2)
mesh_green.position.set(0, 0, 0)
group.add(mesh_green)
scene.add(mesh_green)

const geometry3 = new THREE.BoxGeometry(1, 1, 1)
const material3 = new THREE.MeshBasicMaterial({
  color: 0x0000ff
})

const mesh_blue = new THREE.Mesh(geometry3, material3)
mesh_blue.position.set(3, 0, 0)
group.add(mesh_blue)

// scene.add(group)


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)
camera.position.z = 5

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


const clock = new THREE.Clock()
const loop = () => {

  const elapsedTime = clock.getElapsedTime()
  camera.position.y = Math.sin(elapsedTime) * 2
  camera.position.x = Math.cos(elapsedTime) * 2
  camera.lookAt(mesh_green.position)
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()



