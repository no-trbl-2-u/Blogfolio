import React from 'react';
import styled from '@emotion/styled';
import { PLANET_DATA } from './constants';
import { PlanetInfoProps, PlanetGroupInfo } from '@Types';

const Sidebar = styled.div<{ isOpen: boolean }>`
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

const PlanetInfo: React.FC<PlanetInfoProps> = ({ isOpen, planet, onClose }) => {
  if (!planet) return null;

  const startingPlanet = planet as PlanetGroupInfo;
  const planetName = startingPlanet.userData?.name;
  const data = planetName ? PLANET_DATA[planetName] : null;

  if (!data) return null;

  return (
    <Sidebar isOpen={isOpen}>
      <CloseButton onClick={onClose}>×</CloseButton>
      <PlanetTitle>{planetName}</PlanetTitle>

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
