import React from 'react';
import styled from '@emotion/styled';

const Title = styled.h1`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #f8fafc;
  font-size: 32px;
  font-weight: 100;
  letter-spacing: 8px;
  text-align: center;
  z-index: 1000;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  opacity: 0.9;
`;

const Instruction = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #94a3b8;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 2px;
  text-align: center;
  z-index: 1000;
  opacity: 0.7;
`;

const UI = () => {
  return (
    <>
      <Title>SOLAR SYSTEM</Title>
      <Instruction>
        CLICK THE SUN TO GO BACK • HOVER PLANETS TO EXAMINE
      </Instruction>
    </>
  );
};

export default UI;
