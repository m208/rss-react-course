import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import fakeLocalStorage from './LSMock';

Object.defineProperty(window, 'localStorage', {
  value: fakeLocalStorage,
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/undefined/i);
//   expect(linkElement).toBeInTheDocument();

// });

describe('SearchBar', () => {
  it('get it initial value from local storage', () => {
    localStorage.setItem('searchBarSavedValue', 'TEST_VALUE');
    render(<App />);
    const searchInput = screen.getByPlaceholderText<HTMLInputElement>('Search...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('TEST_VALUE');
  });
});
