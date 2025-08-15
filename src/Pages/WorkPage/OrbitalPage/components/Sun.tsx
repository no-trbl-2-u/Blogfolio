import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

interface SunProps {
  scene: THREE.Scene | null;
  onSunReady: (sun: THREE.Mesh) => void;
}

interface SunRef {
  setScale: (scale: number) => void;
}

function SunComponent({ scene, onSunReady }: SunProps, ref: React.ForwardedRef<SunRef>) {
  const sunRef = useRef<THREE.Mesh | null>(null);

  useImperativeHandle(ref, (): SunRef => ({
    setScale: (scale: number) => {
      if (sunRef.current) {
        sunRef.current.scale.setScalar(scale);
      }
    }
  }));

  useEffect(() => {
    if (!scene) return;

    // Create Sun (center sphere)
    const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sunMaterial = new THREE.MeshLambertMaterial({
      color: 0xffff00,
      emissive: 0xffff00,
      emissiveIntensity: 0.3
    });

    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.castShadow = true;
    sun.receiveShadow = true;
    sun.userData = { type: 'sun' };

    // Create "Back" text on sun surface
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = 256;
      canvas.height = 64;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Text styling
      context.fillStyle = '#000000'; // Black text for contrast on yellow sun
      context.font = 'bold 80px Arial, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('Back', canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      const textMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9
      });

      const textGeometry = new THREE.PlaneGeometry(1.5, 0.4);
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      // Position text on sun surface
      textMesh.position.set(0, 0, 1.6); // Slightly in front of sun surface
      textMesh.lookAt(new THREE.Vector3(0, 0, 10)); // Face camera

      sun.add(textMesh);
    }

    scene.add(sun);
    sunRef.current = sun;

    // Notify parent that sun is ready
    onSunReady(sun);

    return () => {
      if (sun && scene) {
        scene.remove(sun);
      }
    };
  }, [scene, onSunReady]);

  // Animation effect
  useEffect(() => {
    if (!sunRef.current) return;

    const animate = () => {
      if (sunRef.current) {
        sunRef.current.rotation.y += 0.010;
      }
    };

    const interval = setInterval(animate, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything visible
}

const Sun = forwardRef<SunRef, SunProps>(SunComponent);

export default Sun;
