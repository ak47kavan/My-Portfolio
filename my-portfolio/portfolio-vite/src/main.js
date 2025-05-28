import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let scene, camera, renderer, controls;

function init() {
  scene = new THREE.Scene();

  // 🔍 Zoomed out slightly more
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 50); // Increased Z position for zoom-out

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('model-3d').appendChild(renderer.domElement);

  // 🖱️ OrbitControls for mouse interaction
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.enablePan = false; // Optional: disable panning if unwanted
  controls.rotateSpeed = 0.5;

  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const loader = new GLTFLoader();
  loader.load(
    'public/models/scene.gltf',
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      model.scale.set(1, 1, 1);
    },
    undefined,
    (error) => {
      console.error('Error loading GLTF model:', error);
    }
  );

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

init();

// ====================
// GSAP Scroll Animations
// ====================

gsap.to(".hero-img", {
  y: 10,
  repeat: -1,
  yoyo: true,
  duration: 2,
  ease: "sine.inOut"
});

gsap.from(".about h2", {
  scrollTrigger: ".about h2",
  opacity: 0,
  y: 100,
  duration: 1.2,
  ease: "power4.out"
});

gsap.from(".about p", {
  scrollTrigger: ".about p",
  opacity: 0,
  y: 60,
  duration: 1.2,
  delay: 0.3,
  ease: "power4.out"
});

gsap.from(".project-card", {
  scrollTrigger: {
    trigger: ".projects",
    start: "top 80%"
  },
  opacity: 0,
  scale: 0.8,
  stagger: 0.2,
  duration: 1
});

gsap.from(".contact h2, .contact p", {
  scrollTrigger: ".contact",
  opacity: 0,
  y: 80,
  stagger: 0.3,
  duration: 1.2
});
