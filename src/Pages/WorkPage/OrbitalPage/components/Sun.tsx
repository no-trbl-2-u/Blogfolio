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
        sunRef.current.rotation.y += 0.005;
      }
    };

    const interval = setInterval(animate, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything visible
}

const Sun = forwardRef<SunRef, SunProps>(SunComponent);

export default Sun;
