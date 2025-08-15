import '@testing-library/jest-dom';
import Scene3D from './Scene3D';

describe('Scene3D', () => {
  test('component exports successfully', () => {
    expect(Scene3D).toBeDefined();
    expect(typeof Scene3D).toBe('function');
  });
});