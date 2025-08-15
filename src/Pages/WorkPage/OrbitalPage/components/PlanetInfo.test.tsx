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
  const mockProps = {
    isOpen: true,
    planet: {
      userData: { name: 'Earth' }
    },
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