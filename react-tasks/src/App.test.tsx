import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import fakeLocalStorage from './LSMock';
import Card from 'components/Card/Card';

Object.defineProperty(window, 'localStorage', {
  value: fakeLocalStorage,
});

describe('SearchBar', () => {
  it('get it initial value from local storage', () => {
    localStorage.setItem('searchBarSavedValue', 'TEST_VALUE');
    render(<App />);
    const searchInput = screen.getByPlaceholderText<HTMLInputElement>('Search...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('TEST_VALUE');
  });
});

describe('Card', () => {
  it('contains required elements', () => {
    render(<Card date="" description="" header="" imgSrc="https://placeimg.com/320/320/animals" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
  it('fill content with props values', () => {
    render(<Card date="" description="test description" header="test header" imgSrc="" />);
    expect(screen.getByText('test description')).toBeInTheDocument();
    expect(screen.getByText('test header')).toBeInTheDocument();
  });
});
