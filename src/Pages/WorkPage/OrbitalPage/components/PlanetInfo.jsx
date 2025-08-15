import React from 'react';
import styled from '@emotion/styled';

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-left: 2px solid #475569;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease-in-out;
  z-index: 2000;
  overflow-y: auto;
  padding: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    color: #f8fafc;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PlanetTitle = styled.h2`
  color: #f8fafc;
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 4px;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const InfoSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #fbbf24;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionContent = styled.p`
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`;

const PlanetInfo = ({ isOpen, planet, onClose }) => {
    if (!planet) return null;

    const planetData = {
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

    const data = planetData[planet.userData.name] || {};

    return (
        <Sidebar isOpen={isOpen}>
            <CloseButton onClick={onClose}>×</CloseButton>
            <PlanetTitle>{planet.userData.name}</PlanetTitle>

            <InfoSection>
                <SectionTitle>Description</SectionTitle>
                <SectionContent>{data.description}</SectionContent>
            </InfoSection>

            <InfoSection>
                <SectionTitle>Diameter</SectionTitle>
                <SectionContent>{data.diameter}</SectionContent>
            </InfoSection>

            <InfoSection>
                <SectionTitle>Distance from Sun</SectionTitle>
                <SectionContent>{data.distance}</SectionContent>
            </InfoSection>

            <InfoSection>
                <SectionTitle>Composition</SectionTitle>
                <SectionContent>{data.composition}</SectionContent>
            </InfoSection>

            <InfoSection>
                <SectionTitle>Fun Fact</SectionTitle>
                <SectionContent>{data.funFact}</SectionContent>
            </InfoSection>
        </Sidebar>
    );
};

export default PlanetInfo;
