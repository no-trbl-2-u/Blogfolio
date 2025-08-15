import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import OrbitalPage from './OrbitalPage';

// Mock the child components
jest.mock('./components', () => ({
  Scene3D: jest.fn(({ onSceneReady }) => {
    // Simulate scene ready callback
    setTimeout(() => {
      onSceneReady({
        scene: {},
        camera: {},
        renderer: {}
      });
    }, 0);
    return <div data-testid="scene3d">Scene3D</div>;
  }),
  Sun: jest.fn(() => <div data-testid="sun">Sun</div>),
  Planets: jest.fn(() => <div data-testid="planets">Planets</div>),
  UI: jest.fn(() => <div data-testid="ui">UI</div>)
}));

jest.mock('./components/PlanetInfo', () => jest.fn(() => <div data-testid="planet-info">PlanetInfo</div>));

// Mock Three.js
jest.mock('three', () => ({
  Raycaster: jest.fn(),
  Vector2: jest.fn()
}));

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <OrbitalPage />
    </MemoryRouter>
  );
};

describe('OrbitalPage', () => {
  test('renders without crashing', () => {
    const { container } = renderWithRouter();
    expect(container).toBeInTheDocument();
  });
});