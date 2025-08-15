import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sun from './Sun';

// Mock Three.js since it requires WebGL context
jest.mock('three', () => ({
  Mesh: jest.fn().mockImplementation(() => ({
    position: { set: jest.fn() },
    scale: { set: jest.fn() }
  })),
  SphereGeometry: jest.fn(),
  MeshBasicMaterial: jest.fn(),
  TextureLoader: jest.fn().mockImplementation(() => ({
    load: jest.fn()
  }))
}));

describe('Sun', () => {
  const mockProps = {
    onSunReady: jest.fn(),
    onSunHover: jest.fn(),
    onSunClick: jest.fn()
  };

  test('renders without crashing', () => {
    const { container } = render(<Sun {...mockProps} />);
    expect(container).toBeInTheDocument();
  });
});