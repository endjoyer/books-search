import './page.module.css';
import React from 'react';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';

export default function Home() {
  return (
    <div>
      <SearchBar />
      <BookList />
    </div>
  );
}
