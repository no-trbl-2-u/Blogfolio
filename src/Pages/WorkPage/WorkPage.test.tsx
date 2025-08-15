import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WorkPage from './WorkPage';

// Mock useNavigate
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('WorkPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <WorkPage />
      </BrowserRouter>
    );

    // Your test assertions here
  });

  // You can also test navigation if needed
  it('navigates when expected', () => {
    render(
      <BrowserRouter>
        <WorkPage />
      </BrowserRouter>
    );

    // Trigger some action that calls navigate
    // expect(mockNavigate).toHaveBeenCalledWith('/expected-route');
  });
});