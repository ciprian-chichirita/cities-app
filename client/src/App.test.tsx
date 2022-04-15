import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render page and check for header', async () => {
  render(<App />);
  const item = await screen.findByText(/Cities/i);
  expect(item).toBeInTheDocument();
});

test('render page and open modal', async () => {
  render(<App />);
  await screen.findByText(/Cities/i);
  const item = screen.getByTestId("button-show-map-sydney");
  item.click();
  const modalTitle = screen.getByTestId("modal-title-sydney");
  expect(modalTitle).toBeInTheDocument();
});