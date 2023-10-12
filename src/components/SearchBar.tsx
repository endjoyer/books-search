'use client';
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery, setCategory, setSort, fetchBooks } from '../redux/actions';

const SearchBar = () => {
  const [query, setQueryState] = useState('');
  const [category, setCategoryState] = useState('all');
  const [sort, setSortState] = useState('relevance');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query) {
        setError('Search query cannot be empty');
        return;
      }
      dispatch(setQuery(query));
      dispatch(setCategory(category));
      dispatch(setSort(sort));
      dispatch(fetchBooks(query, category, sort));
    },
    [query, category, sort, dispatch]
  );

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQueryState(e.target.value)}
      />
      {error && <p>{error}</p>}
      <select
        value={category}
        onChange={(e) => setCategoryState(e.target.value)}
      >
        <option value="all">All</option>
        <option value="art">Art</option>
        <option value="biography">Biography</option>
        <option value="computers">Computers</option>
        <option value="history">History</option>
        <option value="medical">Medical</option>
        <option value="poetry">Poetry</option>
      </select>
      <select value={sort} onChange={(e) => setSortState(e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="newest">Newest</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
