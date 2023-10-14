'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { loadMoreBooks } from '../redux/actions';
import { RootState } from '@/redux/reducers';
import BookCard from './BookCard';
import styles from './BookList.module.css';
import Loader from './Loader';

interface State {
  books: any[];
  loading: boolean;
  error: any;
  query: string;
  category: string;
  sort: string;
  totalItems: number;
}

const BookList = () => {
  const [startIndex, setStartIndex] = useState(30);
  const books = useSelector((state: State) => state.books);
  const loading = useSelector((state: State) => state.loading);
  const query = useSelector((state: State) => state.query);
  const category = useSelector((state: State) => state.category);
  const sort = useSelector((state: State) => state.sort);
  const totalItems = useSelector((state: State) => state.totalItems);
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const handleLoadMore = () => {
    dispatch(loadMoreBooks(query, category, sort, startIndex));
    setStartIndex(startIndex + 30);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      {totalItems > 0 && (
        <h2 className={styles.sumBooks}>Found {totalItems} results</h2>
      )}
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
