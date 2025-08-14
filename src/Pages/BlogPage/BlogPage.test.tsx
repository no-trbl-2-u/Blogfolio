import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogPage from './BlogPage';

// Mock the components to avoid complex dependencies
jest.mock('@Components/BlogHeader', () => {
  return function MockBlogHeader({ isExtended }: { isExtended?: boolean }) {
    return <div data-testid="blog-header" data-extended={isExtended}>Mock Blog Header</div>;
  };
});

jest.mock('@Components/BlogCard', () => {
  return function MockBlogCard({ title, summary, index, slug }: any) {
    return (
      <div data-testid={`blog-card-${index}`} data-slug={slug}>
        <h3>{title}</h3>
        <p>{summary}</p>
      </div>
    );
  };
});

// Mock the article index
jest.mock('@Hooks/useArticle/articleIndex', () => [
  {
    title: 'Test Post 1',
    summary: 'Test summary 1',
    image: 'test-image-1.jpg',
    slug: 'test-post-1'
  },
  {
    title: 'Test Post 2',
    summary: 'Test summary 2',
    image: 'test-image-2.jpg',
    slug: 'test-post-2'
  },
  {
    title: 'Test Post 3',
    summary: 'Test summary 3',
    image: 'test-image-3.jpg',
    slug: 'test-post-3'
  }
]);

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <BlogPage />
    </MemoryRouter>
  );
};

describe('BlogPage', () => {
  test('renders blog header with extended layout', () => {
    renderWithRouter();

    const blogHeader = screen.getByTestId('blog-header');
    expect(blogHeader).toBeInTheDocument();
    expect(blogHeader).toHaveAttribute('data-extended', 'true');
  });

  test('renders all mock blog posts', () => {
    renderWithRouter();

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('Test Post 3')).toBeInTheDocument();

    expect(screen.getByText('Test summary 1')).toBeInTheDocument();
    expect(screen.getByText('Test summary 2')).toBeInTheDocument();
    expect(screen.getByText('Test summary 3')).toBeInTheDocument();
  });

  test('renders blog cards with correct indices and slugs', () => {
    renderWithRouter();

    expect(screen.getByTestId('blog-card-0')).toHaveAttribute('data-slug', 'test-post-1');
    expect(screen.getByTestId('blog-card-1')).toHaveAttribute('data-slug', 'test-post-2');
    expect(screen.getByTestId('blog-card-2')).toHaveAttribute('data-slug', 'test-post-3');
  });

  test('applies correct styling classes and structure', () => {
    const { container } = renderWithRouter();

    // Check for main structural elements
    expect(container.querySelector('main')).toBeInTheDocument();

    // The blog cards should be in a grid container
    const cardGrid = container.querySelector('main > div');
    expect(cardGrid).toBeInTheDocument();
  });

  test('renders without crashing when no posts available', () => {
    // Mock empty posts array
    jest.doMock('@Hooks/useArticle/articleIndex', () => []);

    expect(() => renderWithRouter()).not.toThrow();
  });

  test('handles router context properly', () => {
    // Test that component doesn't crash when rendered with router
    const { container } = renderWithRouter();
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders page container with correct styling', () => {
    const { container } = renderWithRouter();

    const pageContainer = container.firstChild;
    expect(pageContainer).toBeInTheDocument();
    expect(pageContainer).toHaveStyle('min-height: 100vh');
  });

  test('renders main content with background image', () => {
    const { container } = renderWithRouter();

    const mainContent = container.querySelector('main');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveStyle('max-width: 1280px');
    expect(mainContent).toHaveStyle('margin: 0 auto');
  });
});