import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkPage from './WorkPage';

describe('WorkPage', () => {
  test('renders main title', () => {
    render(<WorkPage />);
    
    expect(screen.getByText('WORK PORTFOLIO')).toBeInTheDocument();
  });

  test('renders subtitle with description', () => {
    render(<WorkPage />);
    
    expect(screen.getByText(/Exploring the intersection of technology and creativity/)).toBeInTheDocument();
  });

  test('renders all work items', () => {
    render(<WorkPage />);
    
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Mobile Apps')).toBeInTheDocument();
    expect(screen.getByText('Brand Design')).toBeInTheDocument();
    expect(screen.getByText('Backend Systems')).toBeInTheDocument();
    expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
    expect(screen.getByText('Cloud Solutions')).toBeInTheDocument();
  });

  test('renders work descriptions', () => {
    render(<WorkPage />);
    
    expect(screen.getByText(/Full-stack web applications using modern React/)).toBeInTheDocument();
    expect(screen.getByText(/Cross-platform mobile applications with React Native/)).toBeInTheDocument();
    expect(screen.getByText(/Complete brand identity design including logos/)).toBeInTheDocument();
  });

  test('renders technology tags', () => {
    render(<WorkPage />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getAllByText('Node.js')).toHaveLength(2); // Appears in Web Development and Backend Systems
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getAllByText('AWS')).toHaveLength(2); // Appears in Web Development and Cloud Solutions
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.getAllByText('Figma')).toHaveLength(2); // Appears in Brand Design and UI/UX Design
  });

  test('renders coming soon badges', () => {
    render(<WorkPage />);
    
    const comingSoonBadges = screen.getAllByText('Coming Soon');
    expect(comingSoonBadges).toHaveLength(6); // One for each work item
  });

  test('has correct component structure', () => {
    const { container } = render(<WorkPage />);
    
    // Check for main container
    expect(container.firstChild).toHaveStyle('min-height: 100vh');
    
    // Check for grid layout
    const workItems = screen.getAllByText(/Web Development|Mobile Apps|Brand Design|Backend Systems|UI\/UX Design|Cloud Solutions/);
    expect(workItems).toHaveLength(6);
  });

  test('renders responsive design elements', () => {
    render(<WorkPage />);
    
    // Test that the component renders without errors
    expect(screen.getByText('WORK PORTFOLIO')).toBeInTheDocument();
    
    // Verify grid structure exists
    const container = screen.getByText('WORK PORTFOLIO').closest('div');
    expect(container).toBeInTheDocument();
  });

  test('contains all expected work categories', () => {
    render(<WorkPage />);
    
    const expectedCategories = [
      'Web Development',
      'Mobile Apps', 
      'Brand Design',
      'Backend Systems',
      'UI/UX Design',
      'Cloud Solutions'
    ];
    
    expectedCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test('renders without crashing', () => {
    expect(() => render(<WorkPage />)).not.toThrow();
  });
});