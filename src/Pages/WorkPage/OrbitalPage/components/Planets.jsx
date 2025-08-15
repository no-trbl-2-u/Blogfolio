import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

// Planet data with realistic orbital parameters and better colors
const PLANETS = [
  { name: 'MERCURY', orbital: 0, speed: 0.8, radius: 3, color: 0x6B6B6B, size: 0.4 },    // Gray-brown
  { name: 'VENUS', orbital: 1, speed: 0.6, radius: 4, color: 0xFFB347, size: 0.6 },      // Orange-yellow
  { name: 'EARTH', orbital: 2, speed: 0.5, radius: 5, color: 0x4A90E2, size: 0.7 },      // Blue
  { name: 'MARS', orbital: 3, speed: 0.7, radius: 6, color: 0xC14444, size: 0.5 },       // Red
  { name: 'JUPITER', orbital: 4, speed: 0.3, radius: 7, color: 0xD4AF37, size: 1.2 },    // Gold
  { name: 'SATURN', orbital: 5, speed: 0.25, radius: 8, color: 0xF4D03F, size: 1.0 },    // Yellow
  { name: 'URANUS', orbital: 6, speed: 0.2, radius: 9, color: 0x85C1E9, size: 0.8 },     // Light blue
  { name: 'NEPTUNE', orbital: 7, speed: 0.15, radius: 10, color: 0x5DADE2, size: 0.8 }   // Blue
];

function PlanetsComponent({ scene, onPlanetsReady, onHoverChange }, ref) {
  const planetsRef = useRef([]);
  const animationRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setPlanetScale: (planet, scale) => {
      if (planet) {
        planet.scale.setScalar(THREE.MathUtils.lerp(planet.scale.x, scale, 0.1));
      }
    }
  }));

  useEffect(() => {
    if (!scene) return;

    // Create planets
    const createPlanet = (planetData, index) => {
      const group = new THREE.Group();

      const geometry = new THREE.SphereGeometry(planetData.size, 24, 24);
      const material = new THREE.MeshLambertMaterial({
        color: planetData.color,
        transparent: true,
        opacity: 0.9
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      group.add(sphere);

      // Create planet name text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 64;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Text styling
      context.fillStyle = '#f8fafc';
      context.font = 'bold 16px Arial, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(planetData.name, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      const textMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8
      });

      const textGeometry = new THREE.PlaneGeometry(2, 0.5);
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(0, -planetData.size - 0.3, 0); // Position below planet
      group.add(textMesh);

      // Store orbital properties
      group.userData = {
        ...planetData,
        angle: Math.random() * Math.PI * 2,
        sphere,
        index,
        textMesh
      };

      scene.add(group);
      return group;
    };

    planetsRef.current = PLANETS.map(createPlanet);

    // Notify parent that planets are ready
    onPlanetsReady(planetsRef.current);

    return () => {
      planetsRef.current.forEach(planet => {
        if (planet && scene) {
          scene.remove(planet);
        }
      });
    };
  }, [scene, onPlanetsReady]);

  // Animation effect
  useEffect(() => {
    if (!planetsRef.current.length) return;

    const animate = () => {
      planetsRef.current.forEach((planet) => {
        const data = planet.userData;

        // Orbital motion
        data.angle += data.speed * 0.01;

        // Simple circular orbits
        const x = Math.cos(data.angle) * data.radius;
        const z = Math.sin(data.angle) * data.radius;
        const y = Math.sin(data.angle * 2) * 0.3; // Slight vertical movement

        planet.position.set(x, y, z);

        // Rotate planet
        planet.rotation.y += 0.01;

        // Make text always face camera
        if (data.textMesh) {
          data.textMesh.lookAt(planet.position.clone().add(new THREE.Vector3(0, 0, 10)));
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Expose hover handler to parent
  useEffect(() => {
    if (onHoverChange) {
      onHoverChange((planet, isHovered) => {
        if (planet) {
          const targetScale = isHovered ? 1.3 : 1;
          planet.scale.setScalar(THREE.MathUtils.lerp(planet.scale.x, targetScale, 0.1));
        }
      });
    }
  }, [onHoverChange]);

  return null; // This component doesn't render anything visible
}

const Planets = forwardRef(PlanetsComponent);

export default Planets;
