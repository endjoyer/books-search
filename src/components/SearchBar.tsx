'use client';
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery, setCategory, setSort, fetchBooks } from '../redux/actions';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [query, setQueryState] = useState('');
  const [category, setCategoryState] = useState('all');
  const [sort, setSortState] = useState('relevance');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) {
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

  const handleBlur = () => {
    setError('');
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearch}>
        <div>
          <h1>Books search</h1>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={query}
              onBlur={handleBlur}
              onChange={(e) => setQueryState(e.target.value)}
              aria-label="Search books"
            />
            <button type="submit"></button>
          </div>
          {error && <p>{error}</p>}
          <div>
            <label>
              Categories
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
            </label>
            <label>
              Sorting by
              <select
                value={sort}
                onChange={(e) => setSortState(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
