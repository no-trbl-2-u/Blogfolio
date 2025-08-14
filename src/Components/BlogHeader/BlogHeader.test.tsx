/**
 * @jest-environment jsdom
 */

/// <reference types="jest" />

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import BlogHeader from './BlogHeader';

// Mock useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Helper function to render component with router
const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <BlogHeader />
    </MemoryRouter>
  );
};

describe('BlogHeader', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders with default extended layout', () => {
    renderWithRouter();

    expect(screen.getByText('LIMINAL SPACES')).toBeInTheDocument();
    expect(screen.getByText(/Journal entries, learning experiences/)).toBeInTheDocument();
    expect(screen.getByText('Return to the surface')).toBeInTheDocument();
  });

  test('renders with compact layout when isExtended is false', () => {
    render(
      <MemoryRouter>
        <BlogHeader isExtended={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('Return to the surface')).toBeInTheDocument();
  });

  test('navigates to home when extended and back button clicked', async () => {
    render(
      <MemoryRouter>
        <BlogHeader isExtended={true} />
      </MemoryRouter>
    );

    const backButton = screen.getByText('Return to the surface').closest('button');
    fireEvent.click(backButton!);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('navigates to blog when not extended and back button clicked', async () => {
    render(
      <MemoryRouter>
        <BlogHeader isExtended={false} />
      </MemoryRouter>
    );

    const backButton = screen.getByText('Return to the surface').closest('button');
    fireEvent.click(backButton!);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/blog');
    });
  });

  test('handles mouse interactions on back button', async () => {
    renderWithRouter();

    const backButton = screen.getByText('Return to the surface').closest('button');

    // Test mouse enter
    fireEvent.mouseEnter(backButton!);
    await waitFor(() => {
      expect(backButton).toHaveStyle('color: rgb(255, 255, 255)');
    });

    // Test mouse leave
    fireEvent.mouseLeave(backButton!);
    await waitFor(() => {
      expect(backButton).toHaveStyle('color: rgb(209, 213, 219)');
    });
  });

  test('renders arrow icon', () => {
    renderWithRouter();

    // The ArrowRight icon should be present
    const backButton = screen.getByText('Return to the surface').closest('button');
    expect(backButton).toBeInTheDocument();

    // Check for the presence of SVG icon
    const svgElement = backButton?.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  test('applies animation state correctly', () => {
    const { rerender } = render(
      <MemoryRouter>
        <BlogHeader isExtended={true} />
      </MemoryRouter>
    );

    // Change to not extended to trigger animation
    rerender(
      <MemoryRouter>
        <BlogHeader isExtended={false} />
      </MemoryRouter>
    );

    // Animation state should be handled internally
    expect(screen.getByText('Return to the surface')).toBeInTheDocument();
  });
});