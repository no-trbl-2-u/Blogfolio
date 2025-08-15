import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { Scene3D, Sun, Planets, UI } from './components';
import PlanetInfo from './components/PlanetInfo';

// Styled components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  cursor: ${props => props.isHovered ? 'pointer' : 'default'};
  position: relative;
`;

function OrbitalPage() {
  const navigate = useNavigate();
  const [scene, setScene] = useState(null);
  const [sun, setSun] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [hoveredSphere, setHoveredSphere] = useState(null);
  const [hoveredSun, setHoveredSun] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const raycasterRef = useRef(null);
  const mouseRef = useRef(null);
  const cameraRef = useRef(null);
  const sunRef = useRef(null);
  const planetsRef = useRef(null);

  // Handle scene ready
  const handleSceneReady = useCallback(({ scene: newScene, camera, renderer }) => {
    console.log('Scene3D component is ready');
    setScene(newScene);
    cameraRef.current = camera;

    // Initialize raycaster and mouse
    raycasterRef.current = new THREE.Raycaster();
    mouseRef.current = new THREE.Vector2();
  }, []);

  // Handle sun ready
  const handleSunReady = useCallback((newSun) => {
    console.log('Sun component is ready');
    setSun(newSun);
  }, []);

  // Handle planets ready
  const handlePlanetsReady = useCallback((newPlanets) => {
    console.log('Planets component is ready, count:', newPlanets.length);
    setPlanets(newPlanets);
  }, []);

  // Handle hover changes
  const handleHoverChange = useCallback((hoverHandler) => {
    // Store the hover handler for use in mouse events
    window.hoverHandler = hoverHandler;
  }, []);

  // Handle planet selection
  const handlePlanetSelect = useCallback((planet) => {
    setSelectedPlanet(planet);
    setIsSidebarOpen(true);
  }, []);

  // Handle sidebar close
  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(false);
    setSelectedPlanet(null);
  }, []);

  // Mouse interaction setup
  useEffect(() => {
    if (!scene || !sun || !planets.length) return;

    console.log('Setting up mouse interactions - scene, sun, and planets are ready');

    const handleMouseMove = (event) => {
      if (!mouseRef.current || !cameraRef.current) return;
      
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleClick = (event) => {
      if (!raycasterRef.current || !mouseRef.current || !cameraRef.current) return;
      
      console.log('Click detected - checking for intersections');
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects([...planets, sun], true);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        
        if (clickedObject === sun) {
          // Only navigate on explicit click, not on component mount
          console.log('Sun clicked - navigating to /work');
          navigate('/work');
        } else {
          // Find which planet was clicked
          const clickedPlanet = planets.find(planet =>
            planet.children.includes(clickedObject) || clickedObject.parent === planet
          );
          if (clickedPlanet) {
            console.log(`Planet clicked: ${clickedPlanet.userData.name}`);
            handlePlanetSelect(clickedPlanet);
          }
        }
      } else {
        // Click outside any object - close sidebar if open
        if (isSidebarOpen) {
          handleSidebarClose();
        }
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Hover detection
    const handleHoverDetection = () => {
      if (!raycasterRef.current || !mouseRef.current || !cameraRef.current) return;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects([...planets, sun], true);

      let newHoveredSphere = null;
      let newHoveredSun = false;

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject === sun) {
          newHoveredSun = true;
        } else {
          newHoveredSphere = planets.find(planet =>
            planet.children.includes(intersectedObject) || intersectedObject.parent === planet
          );
        }
      }

      setHoveredSphere(newHoveredSphere);
      setHoveredSun(newHoveredSun);

      // Apply hover effects
      planets.forEach((planet) => {
        const isHovered = planet === newHoveredSphere;
        if (window.hoverHandler) {
          window.hoverHandler(planet, isHovered);
        }
      });

      // Apply sun hover effect
      if (sunRef.current) {
        const targetScale = newHoveredSun ? 1.2 : 1;
        sunRef.current.setScale(targetScale);
      }
    };

    // Set up hover detection interval
    const hoverInterval = setInterval(handleHoverDetection, 16); // ~60fps

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(hoverInterval);
      delete window.hoverHandler;
    };
  }, [scene, sun, planets, navigate, handlePlanetSelect, isSidebarOpen, handleSidebarClose]);

  const isHovered = hoveredSphere || hoveredSun;

  return (
    <Container isHovered={isHovered}>
      <UI />
      <Scene3D onSceneReady={handleSceneReady} />
      {scene && <Sun ref={sunRef} scene={scene} onSunReady={handleSunReady} />}
      {scene && <Planets ref={planetsRef} scene={scene} onPlanetsReady={handlePlanetsReady} onHoverChange={handleHoverChange} />}
      <PlanetInfo
        isOpen={isSidebarOpen}
        planet={selectedPlanet}
        onClose={handleSidebarClose}
      />
    </Container>
  );
}

export default OrbitalPage;