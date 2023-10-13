'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMoreBooks } from '../redux/actions';
import BookCard from './BookCard';
import styles from './BookList.module.css';

const BookList = () => {
  const [startIndex, setStartIndex] = useState(90);
  const books = useSelector((state: { books: any[] }) => state.books);
  const loading = useSelector((state: { loading: boolean }) => state.loading);
  const error = useSelector((state: { error: any }) => state.error);
  const query = useSelector((state: { query: string }) => state.query);
  const category = useSelector((state: { category: string }) => state.category);
  const sort = useSelector((state: { sort: string }) => state.sort);
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    dispatch(loadMoreBooks(query, category, sort, startIndex));
    setStartIndex(startIndex + 90);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.sumBooks}>Found {books.length} results</h2>
      <div className={styles.bookList}>
        {books && books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
      {books.length > 0 && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </main>
  );
};

export default BookList;
