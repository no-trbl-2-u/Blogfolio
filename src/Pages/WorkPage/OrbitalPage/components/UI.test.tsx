import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UI from './UI';

describe('UI', () => {
  test('renders without crashing', () => {
    render(<UI />);
    expect(screen.getByText('SOLAR SYSTEM')).toBeInTheDocument();
  });

  test('renders instruction text', () => {
    render(<UI />);
    expect(screen.getByText(/CLICK THE SUN TO GO BACK/)).toBeInTheDocument();
  });
});