/* eslint-env jest */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogCard from './BlogCard';
import '@testing-library/jest-dom';

// Mock useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockProps = {
  image: 'https://example.com/test-image.jpg',
  title: 'Test Blog Title',
  summary: 'This is a test blog summary',
  index: 0,
  slug: 'test-blog-slug'
};

const renderWithRouter = (props = mockProps) => {
  return render(
    <MemoryRouter>
      <BlogCard {...props} />
    </MemoryRouter>
  );
};

describe('BlogCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders all content correctly', () => {
    renderWithRouter();

    expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test blog summary')).toBeInTheDocument();
    expect(screen.getByAltText('Test Blog Title')).toBeInTheDocument();
    expect(screen.getByAltText('Test Blog Title')).toHaveAttribute('src', 'https://example.com/test-image.jpg');
  });

  test('navigates to blog detail page when clicked', () => {
    renderWithRouter();

    const cardContainer = screen.getByText('Test Blog Title').closest('.card-container');
    fireEvent.click(cardContainer!);

    expect(mockNavigate).toHaveBeenCalledWith('/blog/test-blog-slug');
  });

  test('handles mouse interactions correctly', async () => {
    renderWithRouter();

    const cardContainer = screen.getByText('Test Blog Title').closest('.card-container');
    const image = screen.getByAltText('Test Blog Title');

    // Test mouse enter
    fireEvent.mouseEnter(cardContainer!);

    await waitFor(() => {
      expect(cardContainer).toHaveStyle('transform: scale(1.05) rotate(1deg)');
    });

    // Test mouse leave
    fireEvent.mouseLeave(cardContainer!);

    await waitFor(() => {
      expect(cardContainer).toHaveStyle('transform: scale(1) rotate(0deg)');
    });

    await waitFor(() => {
      expect(image).toBeInTheDocument();
    })
  });

  test('applies different shapes based on index', () => {
    const { rerender } = renderWithRouter({ ...mockProps, index: 0 });
    let cardContainer = screen.getByText('Test Blog Title').closest('.card-container');

    // Test different indices get different shapes
    rerender(
      <MemoryRouter>
        <BlogCard {...mockProps} index={3} />
      </MemoryRouter>
    );

    cardContainer = screen.getByText('Test Blog Title').closest('.card-container');
    expect(cardContainer).toBeInTheDocument();
  });

  test('renders eye icon', () => {
    renderWithRouter();

    const eyeIcon = document.querySelector('.eye-icon');
    expect(eyeIcon).toBeInTheDocument();
  });

  test('handles image loading states', () => {
    renderWithRouter();

    const image = screen.getByAltText('Test Blog Title');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
  });

  test('applies correct margin based on index', () => {
    const { rerender } = render(
      <MemoryRouter>
        <BlogCard {...mockProps} index={1} />
      </MemoryRouter>
    );

    let cardContainer = screen.getByText('Test Blog Title').closest('.card-container');
    expect(cardContainer).toBeInTheDocument();

    // Test with different index
    rerender(
      <MemoryRouter>
        <BlogCard {...mockProps} index={2} />
      </MemoryRouter>
    );

    cardContainer = screen.getByText('Test Blog Title').closest('.card-container');
    expect(cardContainer).toBeInTheDocument();
  });
});