/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  test('renders children in non-default layout', () => {
    render(
      <Layout>
        <div data-testid="test-child">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // Should not render TODO elements in default mode
    expect(screen.queryByText('TODO - HEADER')).not.toBeInTheDocument();
    expect(screen.queryByText('TODO - Routing')).not.toBeInTheDocument();
  });

  test('renders default layout with TODO elements when defaultLayout is true', () => {
    render(
      <Layout defaultLayout={true}>
        <div data-testid="test-child">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('TODO - HEADER')).toBeInTheDocument();
    expect(screen.getByText('TODO - Routing')).toBeInTheDocument();
  });

  test('renders multiple children correctly', () => {
    render(
      <Layout>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <span data-testid="child-3">Child 3</span>
      </Layout>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  test('applies correct styling to layout container', () => {
    const { container } = render(
      <Layout>
        <div>Test</div>
      </Layout>
    );

    const layoutContainer = container.firstChild;
    expect(layoutContainer).toHaveStyle({
      display: 'flex',
      'flex-direction': 'column',
      'min-height': '100vh'
    });
  });

  test('defaultLayout prop defaults to false', () => {
    render(
      <Layout>
        <div data-testid="test-content">Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.queryByText('TODO - HEADER')).not.toBeInTheDocument();
  });

  test('renders with defaultLayout false explicitly', () => {
    render(
      <Layout defaultLayout={false}>
        <div data-testid="test-content">Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.queryByText('TODO - HEADER')).not.toBeInTheDocument();
    expect(screen.queryByText('TODO - Routing')).not.toBeInTheDocument();
  });
});