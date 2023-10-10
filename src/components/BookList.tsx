'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMoreBooks } from '../redux/actions';
import Book from './Book';

const BookList = () => {
  const [startIndex, setStartIndex] = useState(30);
  const books = useSelector((state: { books: any[] }) => state.books);
  const loading = useSelector((state: { loading: boolean }) => state.loading);
  const error = useSelector((state: { error: any }) => state.error);
  const query = useSelector((state: { query: string }) => state.query);
  const category = useSelector((state: { category: string }) => state.category);
  const sort = useSelector((state: { sort: string }) => state.sort);
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    dispatch(loadMoreBooks(query, category, sort, startIndex));
    setStartIndex(startIndex + 30);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div>
      {books && books.map((book) => <Book key={book.id} book={book} />)}
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  );
};

export default BookList;
