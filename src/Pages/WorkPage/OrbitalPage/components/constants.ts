import { PlanetDescription, PlanetData } from '@Types';

// Planet data with realistic orbital parameters and better colors
export const PLANETS: PlanetData[] = [
    { name: 'MERCURY', orbital: 0, speed: 0.8, radius: 3, color: 0x6B6B6B, size: 0.4 },    // Gray-brown
    { name: 'VENUS', orbital: 1, speed: 0.6, radius: 4, color: 0xFFB347, size: 0.6 },      // Orange-yellow
    { name: 'EARTH', orbital: 2, speed: 0.5, radius: 5, color: 0x4A90E2, size: 0.7 },      // Blue
    { name: 'MARS', orbital: 3, speed: 0.7, radius: 6, color: 0xC14444, size: 0.5 },       // Red
    { name: 'JUPITER', orbital: 4, speed: 0.3, radius: 7, color: 0xD4AF37, size: 1.2 },    // Gold
    { name: 'SATURN', orbital: 5, speed: 0.25, radius: 8, color: 0xF4D03F, size: 1.0 },    // Yellow
    { name: 'URANUS', orbital: 6, speed: 0.2, radius: 9, color: 0x85C1E9, size: 0.8 },     // Light blue
    { name: 'NEPTUNE', orbital: 7, speed: 0.15, radius: 10, color: 0x5DADE2, size: 0.8 }   // Blue
];


export const PLANET_DATA: Record<string, PlanetDescription> = {
    MERCURY: {
        description: "The smallest and innermost planet in the Solar System.",
        diameter: "4,879 km",
        distance: "57.9 million km from Sun",
        composition: "Rocky surface with no atmosphere",
        funFact: "A day on Mercury lasts 59 Earth days, but a year is only 88 Earth days!"
    },
    VENUS: {
        description: "Often called Earth's sister planet due to similar size and mass.",
        diameter: "12,104 km",
        distance: "108.2 million km from Sun",
        composition: "Thick atmosphere of carbon dioxide",
        funFact: "Venus rotates backwards compared to most planets!"
    },
    EARTH: {
        description: "Our home planet and the only known planet with life.",
        diameter: "12,742 km",
        distance: "149.6 million km from Sun",
        composition: "Rocky surface with nitrogen-oxygen atmosphere",
        funFact: "Earth is the only planet not named after a Greek or Roman god!"
    },
    MARS: {
        description: "The Red Planet, target for future human exploration.",
        diameter: "6,779 km",
        distance: "227.9 million km from Sun",
        composition: "Rocky surface with thin atmosphere",
        funFact: "Mars has the largest volcano in the solar system, Olympus Mons!"
    },
    JUPITER: {
        description: "The largest planet in our solar system, a gas giant.",
        diameter: "139,820 km",
        distance: "778.5 million km from Sun",
        composition: "Mostly hydrogen and helium gas",
        funFact: "Jupiter's Great Red Spot is a storm that has been raging for over 300 years!"
    },
    SATURN: {
        description: "Famous for its spectacular ring system.",
        diameter: "116,460 km",
        distance: "1.4 billion km from Sun",
        composition: "Gas giant with prominent rings",
        funFact: "Saturn's rings are made mostly of ice particles and are only about 10 meters thick!"
    },
    URANUS: {
        description: "The ice giant that rotates on its side.",
        diameter: "50,724 km",
        distance: "2.9 billion km from Sun",
        composition: "Ice and gas with tilted rotation",
        funFact: "Uranus is the only planet named after a Greek god instead of Roman!"
    },
    NEPTUNE: {
        description: "The windiest planet with supersonic storms.",
        diameter: "49,244 km",
        distance: "4.5 billion km from Sun",
        composition: "Ice and gas with extreme weather",
        funFact: "Neptune has the fastest winds in the solar system, reaching 2,100 km/h!"
    }
};