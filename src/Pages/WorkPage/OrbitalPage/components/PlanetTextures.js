// Example of how to add realistic planet textures
// You'll need to download NASA planet images and place them in your public folder

export const PLANET_TEXTURES = {
  // Example texture loading function
  loadPlanetTexture: (planetName) => {
    // You would need to download these images from NASA and place them in public/images/planets/
    const texturePath = `/images/planets/${planetName.toLowerCase()}.jpg`;
    
    // Example texture URLs (replace with actual downloaded images):
    const textureUrls = {
      mercury: 'https://photojournal.jpl.nasa.gov/jpeg/PIA11245.jpg',
      venus: 'https://photojournal.jpl.nasa.gov/jpeg/PIA00271.jpg',
      earth: 'https://epic.gsfc.nasa.gov/archive/natural/2019/05/30/png/epic_1b_20190530011359.png',
      mars: 'https://photojournal.jpl.nasa.gov/jpeg/PIA03276.jpg',
      jupiter: 'https://photojournal.jpl.nasa.gov/jpeg/PIA07782.jpg',
      saturn: 'https://photojournal.jpl.nasa.gov/jpeg/PIA11141.jpg',
      uranus: 'https://photojournal.jpl.nasa.gov/jpeg/PIA18182.jpg',
      neptune: 'https://photojournal.jpl.nasa.gov/jpeg/PIA01492.jpg'
    };

    return textureUrls[planetName.toLowerCase()] || null;
  },

  // Alternative: Use procedural textures for a more stylized look
  createProceduralTexture: (planetName) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 512;

    // Create different patterns for each planet
    switch (planetName) {
      case 'MERCURY':
        // Cratered surface
        context.fillStyle = '#6B6B6B';
        context.fillRect(0, 0, 512, 512);
        for (let i = 0; i < 50; i++) {
          context.fillStyle = `rgba(0,0,0,${Math.random() * 0.3})`;
          context.beginPath();
          context.arc(
            Math.random() * 512, 
            Math.random() * 512, 
            Math.random() * 20 + 5, 
            0, 
            Math.PI * 2
          );
          context.fill();
        }
        break;

      case 'VENUS':
        // Cloudy atmosphere
        context.fillStyle = '#FFB347';
        context.fillRect(0, 0, 512, 512);
        for (let i = 0; i < 100; i++) {
          context.fillStyle = `rgba(255,255,255,${Math.random() * 0.4})`;
          context.beginPath();
          context.arc(
            Math.random() * 512, 
            Math.random() * 512, 
            Math.random() * 30 + 10, 
            0, 
            Math.PI * 2
          );
          context.fill();
        }
        break;

      case 'EARTH':
        // Blue with green continents
        context.fillStyle = '#4A90E2';
        context.fillRect(0, 0, 512, 512);
        for (let i = 0; i < 8; i++) {
          context.fillStyle = '#2D5A2D';
          context.beginPath();
          context.arc(
            Math.random() * 512, 
            Math.random() * 512, 
            Math.random() * 100 + 50, 
            0, 
            Math.PI * 2
          );
          context.fill();
        }
        break;

      // Add more planets as needed...
    }

    return canvas;
  }
};

// Usage example in Planets.jsx:
/*
import { PLANET_TEXTURES } from './PlanetTextures';

// In createPlanet function:
const texture = PLANET_TEXTURES.loadPlanetTexture(planetData.name);
if (texture) {
  const textureLoader = new THREE.TextureLoader();
  const planetTexture = textureLoader.load(texture);
  material.map = planetTexture;
} else {
  // Fallback to procedural texture
  const canvas = PLANET_TEXTURES.createProceduralTexture(planetData.name);
  const texture = new THREE.CanvasTexture(canvas);
  material.map = texture;
}
*/
