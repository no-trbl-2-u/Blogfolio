import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

// Styled components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
  cursor: ${props => props.isHovered ? 'pointer' : 'default'};
  position: relative;
`;

const Title = styled.h1`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #1e293b;
  font-size: 32px;
  font-weight: 100;
  letter-spacing: 8px;
  text-align: center;
  z-index: 1000;
  text-shadow: 
    0 0 10px rgba(0,0,0,0.3),
    0 0 20px rgba(0,0,0,0.2),
    0 0 30px rgba(0,0,0,0.1),
    2px 2px 4px rgba(0,0,0,0.4),
    -2px -2px 4px rgba(0,0,0,0.2),
    2px -2px 4px rgba(0,0,0,0.2),
    -2px 2px 4px rgba(0,0,0,0.2);
  opacity: 0.8;
`;

const Instruction = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #64748b;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 2px;
  text-align: center;
  z-index: 1000;
  opacity: 0.6;
`;

// Work items data - more atomic orbital planes
const PLANETS = [
  { name: 'MERCURY', orbital: 0, speed: 0.8, radius: 4 },
  { name: 'VENUS', orbital: 1, speed: 1.2, radius: 3.5 },
  { name: 'EARTH', orbital: 2, speed: 0.6, radius: 5 },
  { name: 'MARS', orbital: 3, speed: 0.9, radius: 4.5 },
  { name: 'JUPITER', orbital: 4, speed: 1.5, radius: 3 },
  { name: 'SATURN', orbital: 0, speed: 0.7, radius: 5.5 },
  { name: 'URANUS', orbital: 2, speed: 1.1, radius: 4.2 },
  { name: 'NEPTUNE', orbital: 3, speed: 1.3, radius: 3.8 },
  { name: 'PLUTO', orbital: 4, speed: 2.6, radius: 10 }
];

function OrbitalPage() {
  const navigate = useNavigate();
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const spheresRef = useRef([]);
  const backSphereRef = useRef(null);
  const textElementsRef = useRef([]);
  const backTextRef = useRef(null);
  const animationRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const [hoveredSphere, setHoveredSphere] = useState(null);
  const [hoveredBack, setHoveredBack] = useState(false);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  useEffect(() => {
    // Capture ref values to avoid stale closure issues
    const mountElement = mountRef.current;

    // Scene setup - bright corporate liminal space
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.Fog(0xf8fafc, 12, 25);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xf8fafc);
    rendererRef.current = renderer;
    mountElement.appendChild(renderer.domElement);

    // Bright office lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Main bright overhead light
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(0, 10, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    // Secondary fill light
    const fillLight = new THREE.PointLight(0xf0f8ff, 0.8, 20);
    fillLight.position.set(-5, 5, 3);
    scene.add(fillLight);

    // Additional rim light
    const rimLight = new THREE.PointLight(0xffffff, 0.6, 15);
    rimLight.position.set(3, -2, -5);
    scene.add(rimLight);

    // Create central BACK sphere - clean white/light gray
    const backGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const backMaterial = new THREE.MeshLambertMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.95
    });
    const backSphere = new THREE.Mesh(backGeometry, backMaterial);
    backSphere.castShadow = true;
    backSphere.receiveShadow = true;
    scene.add(backSphere);
    backSphereRef.current = backSphere;

    // Create billboard text for spheres
    const createBillboardText = (text, color = 0x1e293b) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 128;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Drop shadow
      context.shadowColor = 'rgba(0, 0, 0, 0.4)';
      context.shadowBlur = 6;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;

      // Text styling
      context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      context.font = 'bold 42px Arial, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: text === 'BACK' ? 0 : 1
      });

      const geometry = new THREE.PlaneGeometry(1.8, 0.45);
      const mesh = new THREE.Mesh(geometry, material);

      return mesh;
    };

    const backText = createBillboardText('BACK', 0x1e293b);
    backText.position.set(0, 0, 2);
    scene.add(backText);
    backTextRef.current = backText;

    // Create work spheres with billboard text
    const createWorkSphere = (item, index) => {
      const group = new THREE.Group();

      // Main sphere - clean corporate colors
      const geometry = new THREE.SphereGeometry(0.6, 24, 24);
      const hue = 0.6 + index * 0.05; // Cool corporate blues/grays
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color().setHSL(hue, 0.2, 0.8),
        transparent: true,
        opacity: 0.9
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      group.add(sphere);

      // Create billboard text
      const textMesh = createBillboardText(item.name, 0.2, 0x1e293b);
      textMesh.position.set(0, 0, 1);
      group.add(textMesh);

      // Store orbital properties
      group.userData = {
        ...item,
        originalScale: 1,
        angle: Math.random() * Math.PI * 2,
        planeOffset: 0,
        originalRadius: item.radius,
        textMesh,
        sphere
      };

      scene.add(group);
      return group;
    };

    // Create all work spheres
    spheresRef.current = PLANETS.map(createWorkSphere);

    // Store text elements for camera-facing updates
    textElementsRef.current = spheresRef.current.map(sphere => sphere.userData.textMesh);

    // Mouse interaction setup
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleClick = () => {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects([...spheresRef.current, backSphere], true);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject === backSphere) {
          // console.log('Navigate back');
          navigate('/work')
        } else {
          // Find which work sphere was clicked
          const clickedSphere = spheresRef.current.find(sphere =>
            sphere.children.includes(clickedObject) || clickedObject.parent === sphere
          );
          if (clickedSphere) {
            console.log(`Navigate to: ${clickedSphere.userData.name}`);
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      const elapsedTime = clockRef.current.getElapsedTime();

      // Subtle lighting variation (much more subtle in bright environment)
      mainLight.intensity = 1.2 + Math.sin(elapsedTime * 2) * 0.05;
      fillLight.intensity = 0.8 + Math.sin(elapsedTime * 1.5) * 0.1;

      // Update sphere positions and hover detection
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects([...spheresRef.current, backSphere], true);

      let newHoveredSphere = null;
      let newHoveredBack = false;

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject === backSphere) {
          newHoveredBack = true;
        } else {
          newHoveredSphere = spheresRef.current.find(sphere =>
            sphere.children.includes(intersectedObject) || intersectedObject.parent === sphere
          );
        }
      }

      // Determine if any hover is active (stops all rotation)
      const anyHover = newHoveredSphere || newHoveredBack;

      // Update hover states
      setHoveredSphere(newHoveredSphere);
      setHoveredBack(newHoveredBack);

      // Update back sphere text opacity
      if (backTextRef.current) {
        backTextRef.current.material.opacity = newHoveredBack ? 1 : 0;
        backTextRef.current.lookAt(camera.position);
      }

      // Animate work spheres
      spheresRef.current.forEach((sphere, index) => {
        const data = sphere.userData;

        // Make text billboard always face camera
        if (data.textMesh) {
          data.textMesh.lookAt(camera.position);
        }

        if (!anyHover) {
          // Normal orbital motion - only when nothing is hovered
          data.angle += data.speed * 0.02;

          // Plane precession (slow wobble)
          data.planeOffset += 0.005;

          // Individual sphere drift
          const driftY = Math.sin(elapsedTime * 0.5 + index) * 0.3;
          const driftZ = Math.sin(elapsedTime * 0.3 + index * 1.5) * 0.2;

          // Orbital position with elliptical path
          const ellipseA = data.radius;
          const ellipseB = data.radius * 0.8;
          const x = Math.cos(data.angle) * ellipseA;
          const z = Math.sin(data.angle) * ellipseB;
          const y = Math.sin(data.planeOffset) * 0.5 + driftY;

          // Different atomic orbital planes - more random 3D orientations
          const planeRotationY = data.orbital * Math.PI / 2.5 + data.orbital * 0.7;
          const planeRotationX = data.orbital * Math.PI / 4 + Math.sin(data.orbital) * 0.8;
          const planeRotationZ = data.orbital * Math.PI / 3.5 + data.orbital * 0.5;
          // Apply 3D rotations for atomic orbital effect
          let finalX = x;
          let finalY = y;
          let finalZ = z;

          // Rotate around Y axis
          const tempX = finalX * Math.cos(planeRotationY) - finalZ * Math.sin(planeRotationY);
          finalZ = finalX * Math.sin(planeRotationY) + finalZ * Math.cos(planeRotationY);
          finalX = tempX;

          // Rotate around X axis
          const tempY = finalY * Math.cos(planeRotationX) - finalZ * Math.sin(planeRotationX);
          finalZ = finalY * Math.sin(planeRotationX) + finalZ * Math.cos(planeRotationX);
          finalY = tempY;

          // Rotate around Z axis
          const tempX2 = finalX * Math.cos(planeRotationZ) - finalY * Math.sin(planeRotationZ);
          finalY = finalX * Math.sin(planeRotationZ) + finalY * Math.cos(planeRotationZ);
          finalX = tempX2;

          sphere.position.set(finalX, finalY, finalZ + driftZ);

          // Size scaling based on angle
          const scale = 0.7 + (Math.sin(data.angle) * 0.3 + 0.3) * 0.5;
          sphere.scale.setScalar(scale);

          // Rotate sphere for visual interest
          sphere.rotation.y += 0.01;
          sphere.rotation.x += 0.005;
        }

        // Handle hover scaling (independent of rotation)
        if (sphere === newHoveredSphere) {
          // Hovered sphere - enlarged
          const targetScale = 1.4;
          const currentScale = sphere.scale.x;
          sphere.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, 0.1));
        } else if (!anyHover) {
          // Only reset scale if nothing is hovered (to maintain current size during other hovers)
          const normalScale = 0.7 + (Math.sin(sphere.userData.angle) * 0.3 + 0.3) * 0.5;
          sphere.scale.setScalar(normalScale);
        }
      });

      // Rotate back sphere slowly (only when not hovered)
      if (backSphere && !anyHover) {
        backSphere.rotation.y += 0.005;
        backSphere.rotation.x += 0.002;
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const isHovered = hoveredSphere || hoveredBack;

  return (
    <Container isHovered={isHovered}>
      <Title>WORK PORTFOLIO</Title>
      <div ref={mountRef} />
      <Instruction>
        HOVER TO EXAMINE • CLICK TO ENTER
      </Instruction>
    </Container>
  );
}

export default OrbitalPage;