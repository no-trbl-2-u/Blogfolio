import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Planets from './Planets';

// Mock Three.js since it requires WebGL context
jest.mock('three', () => ({
  Group: jest.fn().mockImplementation(() => ({
    add: jest.fn(),
    children: []
  })),
  Mesh: jest.fn(),
  SphereGeometry: jest.fn(),
  MeshPhongMaterial: jest.fn(),
  Object3D: jest.fn()
}));

describe('Planets', () => {
  const mockProps = {
    onPlanetsReady: jest.fn(),
    onPlanetHover: jest.fn(),
    onPlanetClick: jest.fn()
  };

  test('renders without crashing', () => {
    const { container } = render(<Planets {...mockProps} />);
    expect(container).toBeInTheDocument();
  });
});