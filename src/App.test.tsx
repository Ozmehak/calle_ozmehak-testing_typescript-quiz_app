import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {shuffle} from "./utils/Utils";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('shuffle always shuffles input', () => {
  const array = [{a:0}, {b:1}, {c:1}, {d:1}, {e:1}, {f:1}]
  const array2 = shuffle(array)
  expect(array).not.toBe(array2)
  expect(array.length).toBe(array2.length)
})
