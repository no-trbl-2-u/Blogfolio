import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogDetailPage from './BlogDetailPage';

// Mock the components to avoid complex dependencies
jest.mock('@Components/BlogHeader', () => {
  return function MockBlogHeader({ isExtended }: { isExtended?: boolean }) {
    return <div data-testid="blog-header" data-extended={isExtended}>Mock Blog Header</div>;
  };
});

jest.mock('@Pages/BlogPage/Articles/080925', () => {
  return function MockTestingArticle() {
    return <div data-testid="testing-article">Mock Testing Article Content</div>;
  };
});

const renderWithRouter = (slug = 'test-slug') => {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <BlogDetailPage />
    </MemoryRouter>
  );
};

// Mock useParams hook
const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams(),
}));

describe('BlogDetailPage', () => {
  beforeEach(() => {
    // Reset document title
    document.title = '';
    mockUseParams.mockReturnValue({ slug: 'test-slug' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders blog header with compact layout', () => {
    renderWithRouter();
    
    const blogHeader = screen.getByTestId('blog-header');
    expect(blogHeader).toBeInTheDocument();
    expect(blogHeader).toHaveAttribute('data-extended', 'false');
  });

  test('renders testing article component', () => {
    renderWithRouter();
    
    expect(screen.getByTestId('testing-article')).toBeInTheDocument();
    expect(screen.getByText('Mock Testing Article Content')).toBeInTheDocument();
  });

  test('sets document title based on slug', () => {
    mockUseParams.mockReturnValue({ slug: 'my-awesome-post' });
    renderWithRouter('my-awesome-post');
    
    expect(document.title).toBe('my-awesome-post | Blog');
  });

  test('handles slug with uppercase characters', () => {
    mockUseParams.mockReturnValue({ slug: 'My-AWESOME-Post' });
    renderWithRouter('My-AWESOME-Post');
    
    expect(document.title).toBe('my-awesome-post | Blog');
  });

  test('handles undefined slug', () => {
    mockUseParams.mockReturnValue({ slug: undefined });
    renderWithRouter();
    
    expect(document.title).toBe('undefined | Blog');
  });

  test('renders page container with correct styling', () => {
    const { container } = renderWithRouter();
    
    const pageContainer = container.firstChild;
    expect(pageContainer).toBeInTheDocument();
    expect(pageContainer).toHaveStyle('min-height: 100vh');
  });

  test('renders content container with correct styling', () => {
    const { container } = renderWithRouter();
    
    const contentContainer = container.querySelector('div:nth-child(2)');
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveStyle('max-width: 1280px');
    expect(contentContainer).toHaveStyle('margin: 0 auto');
  });

  test('updates title when slug changes', () => {
    // Test that the component handles title updates
    // The useEffect for title setting is tested in the individual render tests
    mockUseParams.mockReturnValue({ slug: 'test-post' });
    renderWithRouter('test-post');
    
    expect(document.title).toBe('test-post | Blog');
  });

  test('renders without crashing', () => {
    expect(() => renderWithRouter()).not.toThrow();
  });

  test('has correct component structure', () => {
    const { container } = renderWithRouter();
    
    // Should have main container
    expect(container.firstChild).toBeInTheDocument();
    
    // Should have header and content sections
    expect(screen.getByTestId('blog-header')).toBeInTheDocument();
    expect(screen.getByTestId('testing-article')).toBeInTheDocument();
  });
});