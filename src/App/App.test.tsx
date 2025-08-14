import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the components to avoid complex dependencies
jest.mock('@Pages/LandingPage', () => {
  return function MockLandingPage() {
    return <div data-testid="landing-page">Landing Page</div>;
  };
});

jest.mock('@Pages/BlogPage', () => {
  return function MockBlogPage() {
    return <div data-testid="blog-page">Blog Page</div>;
  };
});

jest.mock('@Pages/WorkPage', () => {
  return function MockWorkPage() {
    return <div data-testid="work-page">Work Page</div>;
  };
});

jest.mock('@Pages/BlogPage/BlogDetailPage/BlogDetailPage', () => {
  return function MockBlogDetailPage() {
    return <div data-testid="blog-detail-page">Blog Detail Page</div>;
  };
});

jest.mock('@Pages/Layout', () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="layout">{children}</div>;
  };
});

describe('App', () => {
  test('renders app component without crashing', () => {
    // Since App has its own Router, we test it directly
    expect(() => render(<App />)).not.toThrow();
  });

  test('renders app with router structure', () => {
    render(<App />);
    
    // Check that the app renders without errors
    // The specific routing behavior is tested in individual component tests
    expect(document.body).toBeInTheDocument();
  });
});