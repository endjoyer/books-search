import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import SearchBar from './SearchBar';

test('renders SearchBar and handles input change', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

  const input = getByLabelText('Search books');
  fireEvent.change(input, { target: { value: 'test' } });
  expect(input.value).toBe('test');
});
