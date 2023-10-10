'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/actions';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');
  const dispatch = useDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchBooks(query, category, sort));
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="art">Art</option>
        <option value="biography">Biography</option>
        <option value="computers">Computers</option>
        <option value="history">History</option>
        <option value="medical">Medical</option>
        <option value="poetry">Poetry</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="newest">Newest</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
