import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

// Planet data with realistic orbital parameters
const PLANETS = [
  { name: 'MERCURY', orbital: 0, speed: 0.8, radius: 3, color: 0x8B4513, size: 0.4 },    // Brown
  { name: 'VENUS', orbital: 1, speed: 0.6, radius: 4, color: 0xFFD700, size: 0.6 },      // Gold
  { name: 'EARTH', orbital: 2, speed: 0.5, radius: 5, color: 0x4169E1, size: 0.7 },      // Blue
  { name: 'MARS', orbital: 3, speed: 0.7, radius: 6, color: 0xDC143C, size: 0.5 },       // Red
  { name: 'JUPITER', orbital: 4, speed: 0.3, radius: 7, color: 0xDAA520, size: 1.2 },    // Goldenrod
  { name: 'SATURN', orbital: 5, speed: 0.25, radius: 8, color: 0xF4A460, size: 1.0 },    // Sandy brown
  { name: 'URANUS', orbital: 6, speed: 0.2, radius: 9, color: 0x40E0D0, size: 0.8 },     // Turquoise
  { name: 'NEPTUNE', orbital: 7, speed: 0.15, radius: 10, color: 0x1E90FF, size: 0.8 }   // Dodger blue
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

      // Store orbital properties
      group.userData = {
        ...planetData,
        angle: Math.random() * Math.PI * 2,
        sphere,
        index
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
