import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlanetInfo from './PlanetInfo';

// Mock the constants
jest.mock('./constants', () => ({
  PLANET_DATA: {
    'Earth': {
      description: 'Test description',
      diameter: 'Test diameter',
      distance: 'Test distance',
      composition: 'Test composition',
      funFact: 'Test fun fact'
    }
  }
}));

describe('PlanetInfo', () => {
  // Create a proper mock THREE.Group object
  const mockPlanet = {
    userData: { name: 'Earth' },
    // Add minimal THREE.Group properties that might be accessed
    children: [],
    type: 'Group',
    isGroup: true
  } as any; // Use 'as any' to bypass full THREE.Group interface requirements

  const mockProps = {
    isOpen: true,
    planet: mockPlanet,
    onClose: jest.fn()
  };

  test('renders without crashing when planet is provided', () => {
    render(<PlanetInfo {...mockProps} />);
    expect(screen.getByText('Earth')).toBeInTheDocument();
  });

  test('renders nothing when planet is null', () => {
    const { container } = render(<PlanetInfo isOpen={true} planet={null} onClose={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });
});