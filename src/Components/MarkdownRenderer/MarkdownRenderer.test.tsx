import { render, screen, fireEvent } from '@testing-library/react';
import MarkdownRenderer from './MarkdownRenderer';

// Mock the problematic ES modules
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: any) {
    return <div data-testid="markdown-content">{children}</div>;
  };
});

jest.mock('remark-gfm', () => () => {});
jest.mock('rehype-highlight', () => () => {});

// Mock clipboard API
const mockClipboard = {
  writeText: jest.fn(),
};
Object.assign(navigator, {
  clipboard: mockClipboard,
});

describe('MarkdownRenderer', () => {
  beforeEach(() => {
    mockClipboard.writeText.mockClear();
  });

  test('renders with markdown content', () => {
    const content = 'Test markdown content';
    render(<MarkdownRenderer content={content} />);
    
    expect(screen.getByTestId('markdown-content')).toBeInTheDocument();
    expect(screen.getByText('Test markdown content')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const content = 'Test content';
    const { container } = render(<MarkdownRenderer content={content} className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('handles empty content', () => {
    const { container } = render(<MarkdownRenderer content="" />);
    
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByTestId('markdown-content')).toBeInTheDocument();
  });

  test('renders MarkdownContainer with correct structure', () => {
    const content = 'Test content';
    const { container } = render(<MarkdownRenderer content={content} />);
    
    // Check that the main container is an article element
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  test('passes content to ReactMarkdown component', () => {
    const content = 'This is test markdown content';
    render(<MarkdownRenderer content={content} />);
    
    expect(screen.getByTestId('markdown-content')).toHaveTextContent(content);
  });

  test('renders without crashing with complex content', () => {
    const content = `
# Heading
This is a paragraph with **bold** and *italic* text.
\`\`\`javascript
const test = 'code';
\`\`\`
> Blockquote
- List item
[Link](https://example.com)
    `;
    
    expect(() => render(<MarkdownRenderer content={content} />)).not.toThrow();
  });

  test('component accepts remarkPlugins and rehypePlugins', () => {
    // This test verifies that the component can be instantiated with the plugins
    // The actual plugin functionality is mocked, so we just test basic rendering
    const content = 'Test content with plugins';
    const { container } = render(<MarkdownRenderer content={content} />);
    
    expect(container.firstChild).toBeInTheDocument();
  });
});