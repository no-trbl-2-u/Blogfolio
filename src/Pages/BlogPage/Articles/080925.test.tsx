import { render, screen } from '@testing-library/react';
import Article080925 from './080925';

describe('Article080925', () => {
  test('renders the article title', () => {
    render(<Article080925 />);
    
    expect(screen.getByText('Day One 08/09/25')).toBeInTheDocument();
  });

  test('renders the main article content', () => {
    render(<Article080925 />);
    
    expect(screen.getByText(/So today my air conditioner broke/)).toBeInTheDocument();
    expect(screen.getByText(/monumental heaps of anxiety/)).toBeInTheDocument();
  });

  test('renders blockquotes correctly', () => {
    render(<Article080925 />);
    
    expect(screen.getByText(/You`re playing whisper down the lane/)).toBeInTheDocument();
    expect(screen.getByText(/You`re given a number and an array of numbers/)).toBeInTheDocument();
  });

  test('renders code blocks', () => {
    render(<Article080925 />);
    
    // Check for code content
    expect(screen.getByText(/const array = \[1, 1, 3, 1, 1\]/)).toBeInTheDocument();
    expect(screen.getByText(/let firstWrongAnswer = undefined/)).toBeInTheDocument();
  });

  test('has correct article structure with semantic HTML', () => {
    const { container } = render(<Article080925 />);
    
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveStyle('width: 100%');
  });

  test('renders heading as h1', () => {
    render(<Article080925 />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Day One 08/09/25');
  });

  test('renders multiple paragraphs', () => {
    const { container } = render(<Article080925 />);
    
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThan(1);
  });

  test('renders nested blockquotes', () => {
    const { container } = render(<Article080925 />);
    
    const blockquotes = container.querySelectorAll('blockquote');
    expect(blockquotes.length).toBeGreaterThan(1);
    
    // Check for nested blockquote
    const nestedBlockquote = container.querySelector('blockquote blockquote');
    expect(nestedBlockquote).toBeInTheDocument();
  });

  test('renders pre and code elements for code blocks', () => {
    const { container } = render(<Article080925 />);
    
    const preElements = container.querySelectorAll('pre');
    const codeElements = container.querySelectorAll('code');
    
    expect(preElements.length).toBeGreaterThan(0);
    expect(codeElements.length).toBeGreaterThan(0);
  });

  test('includes language class for syntax highlighting', () => {
    const { container } = render(<Article080925 />);
    
    const jsCodeBlocks = container.querySelectorAll('code.language-javascript');
    expect(jsCodeBlocks.length).toBeGreaterThan(0);
  });

  test('renders without crashing', () => {
    expect(() => render(<Article080925 />)).not.toThrow();
  });

  test('contains assessment test content', () => {
    render(<Article080925 />);
    
    expect(screen.getByText(/I had 15 minutes to solve the problem/)).toBeInTheDocument();
    expect(screen.getByText(/whisper down the lane/)).toBeInTheDocument();
  });
});