'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery, setCategory, setSort, fetchBooks } from '../redux/actions';

const SearchBar = () => {
  const [query, setQueryState] = useState('');
  const [category, setCategoryState] = useState('all');
  const [sort, setSortState] = useState('relevance');
  const dispatch = useDispatch();
  console.log(query);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setQuery(query));
    dispatch(setCategory(category));
    dispatch(setSort(sort));
    dispatch(fetchBooks(query, category, sort));
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQueryState(e.target.value)}
      />
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
