import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../app/App';

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
