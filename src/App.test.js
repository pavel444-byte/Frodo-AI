import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AI Chat header', () => {
  render(<App />);
  const headerElement = screen.getByText(/AI Chat/i);
  expect(headerElement).toBeInTheDocument();
});
