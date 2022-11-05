import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

import fakeLocalStorage from './mocks/LSMock';
import Card from 'components/Card/Card';
import { FormsPage } from 'components/FormsPage/FormsPage';
import userEvent from '@testing-library/user-event';
import { fetchMock } from 'mocks/fetchMock';

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

describe('Forms', () => {
  it('Submit button disabled by default', () => {
    render(<FormsPage />);
    const submit = screen.getByText('Subscribe!');
    expect(submit).toBeInTheDocument();

    expect(submit).toHaveAttribute('disabled');
  });

  it('Submit button active after input change', () => {
    render(<FormsPage />);
    const submit = screen.getByText('Subscribe!');
    const nameInput = screen.getByLabelText('Enter your name:');

    userEvent.type(nameInput, 'test');

    expect(submit).not.toHaveAttribute('disabled');
  });

  it('Create Card on submit', () => {
    render(<FormsPage />);
    const submit = screen.getByText('Subscribe!');
    const nameInput = screen.getByLabelText('Enter your name:');
    const emailInput = screen.getByLabelText('Enter your email:');

    userEvent.type(nameInput, 'tester name');
    userEvent.type(emailInput, 'test@test.test');
    userEvent.click(submit);

    expect(screen.getByText(/tester name/)).toBeInTheDocument();
    expect(screen.getByText(/email: test@test.test/)).toBeInTheDocument();
  });

  it('HTML5 Validation check', () => {
    render(<FormsPage />);
    const emailInput = screen.getByLabelText('Enter your email:');

    userEvent.type(emailInput, 'invalid email');
    expect(emailInput).toBeInvalid();

    userEvent.type(emailInput, 'test@test.test');
    expect(emailInput).toBeValid();
  });
});

describe('Flickr service API', () => {
  it('Draw card with fetched data', async () => {
    global.fetch = jest.fn().mockImplementation(fetchMock);

    render(<App />);

    const searchInput = screen.getByPlaceholderText<HTMLInputElement>('Search...');
    userEvent.type(searchInput, 'forest');
    fireEvent.keyUp(searchInput, { key: 'Enter' });

    await waitFor(() => expect(screen.getByText('Test title')).toBeInTheDocument());
  });

  it('Draw multiple cards with fetched data', async () => {
    global.fetch = jest.fn().mockImplementation(fetchMock);

    render(<App />);

    const searchInput = screen.getByPlaceholderText<HTMLInputElement>('Search...');
    userEvent.type(searchInput, 'forest');
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    await waitFor(() => expect(screen.getByText('Test title')).toBeInTheDocument());

    userEvent.type(searchInput, 'forest');
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    await waitFor(() => expect(screen.queryAllByText('Test title')).toHaveLength(2));
  });
});
