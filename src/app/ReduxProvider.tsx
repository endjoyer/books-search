'use client';
import { Provider } from 'react-redux';
import store from '../redux/store';
import React from 'react';
import ErrorModal from '../components/ErrorModal';
import SearchBar from '@/components/SearchBar';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <SearchBar />
      {children}
      <ErrorModal />
    </Provider>
  );
}
