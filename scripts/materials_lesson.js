import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import colorTexture from "../static/BrickTextures/BricksReclaimedWhitewashedOffset001_COL_2K_METALNESS.png";
import roughnessTexture from "../static/BrickTextures/BricksReclaimedWhitewashedOffset001_ROUGHNESS_2K_METALNESS.png";
import metalnessTexture from "../static/BrickTextures/BricksReclaimedWhitewashedOffset001_METALNESS_2K_METALNESS.png";
import ambientTexture from "../static/BrickTextures/BricksReclaimedWhitewashedOffset001_AO_2K_METALNESS.png";
import normalTexture from "../static/BrickTextures/BricksReclaimedWhitewashedOffset001_NRM_2K_METALNESS.png";
import displacementTexture from "../static/BrickTextures/BricksReclaimedWhitewashedOffset001_DISP_2K_METALNESS.png";

import GUI from "lil-gui";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";

const gui = new GUI()

const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const loadingManager = new THREE.LoadingManager()
const textureManager = new THREE.TextureLoader(loadingManager)
const brick = textureManager.load(colorTexture)
const ambient = textureManager.load(ambientTexture)
const roughness = textureManager.load(roughnessTexture)
const metalness = textureManager.load(metalnessTexture)
const normalness = textureManager.load(normalTexture)
const displacement = textureManager.load(displacementTexture)





brick.colorSpace = THREE.SRGBColorSpace

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 5
scene.add(camera)


const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)


// const material = new THREE.MeshBasicMaterial()
// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshLambertMaterial()
const material = new THREE.MeshStandardMaterial()
material.side = THREE.DoubleSide
// material.metalness = 1
// material.roughness = 0

material.wireframe = true
material.map = brick
material.aoMap = ambient
material.aoMapIntensity = 3
material.roughnessMap = roughness
material.metalnessMap = metalness
material.normalMap = normalness
material.normalScale.set(5, 5)
material.displacementMap = displacement
material.displacementScale = .1


brick.repeat.x = 2
// brick.repeat.y = 3
// brick.wrapS - THREE.MirroredRepeatWrapping
// brick.wrapT = THREE.RepeatWrapping

brick.minFilter = THREE.NearestFilter
brick.wrapS = THREE.RepeatWrapping



const light = new THREE.AmbientLight(0xffffff)
scene.add(light)

// const point = new THREE.PointLight(0xffffff, 30)
// point.position.set(-2, 0, 2)
// scene.add(point)





// const exrLoader = new EXRLoader()
// exrLoader.load('../static/hdri/poly_haven_studio_4k.exr', (environmentMap) => {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping
//     scene.background = environmentMap
//     scene.environment = environmentMap
// })




const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    material
)
sphere.position.x = - 3


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 64, 64),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1),
    material
)
torus.position.x = 3

scene.add(sphere, plane, torus)


const controls = new OrbitControls(camera, canvas)
controls.update()

renderer.render(scene, camera)

const clock = new THREE.Clock()

const loop = () => {
    const elapsedTime = clock.getElapsedTime()
    window.requestAnimationFrame(loop)
    sphere.rotation.y = elapsedTime * 0.6
    torus.rotation.z = elapsedTime * 0.4

    controls.update()
    renderer.render(scene, camera)
}

loop()

window.addEventListener('dblclick', (event) => {
    canvas.requestFullscreen()
})