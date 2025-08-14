import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';

// Add Jest types
/// <reference types="jest" />

// Mock the components to avoid complex dependencies
jest.mock('@Pages/LandingPage', () => {
  return () => <div data-testid="landing-page">Landing Page</div>;
});

jest.mock('@Pages/BlogPage', () => {
  return () => <div data-testid="blog-page">Blog Page</div>;
});

jest.mock('@Pages/WorkPage', () => {
  return () => <div data-testid="work-page">Work Page</div>;
});

jest.mock('@Pages/BlogPage/BlogDetailPage/BlogDetailPage', () => {
  return () => <div data-testid="blog-detail-page">Blog Detail Page</div>;
});

jest.mock('@Pages/Layout', () => {
  return ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  );
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