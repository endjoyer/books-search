'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './BookDetails.module.css';
import Loader from '@/components/Loader';
import bookCover from '../../../images/defolt-book.png';
import { useDispatch } from 'react-redux';
import { fetchBooksFailure } from '@/redux/actions';

type Props = {
  params: {
    id: string;
  };
};

const BookDetails = ({ params: { id } }: Props) => {
  const [book, setBook] = useState<any>(null);
  const [error, setError] = useState(null);
  const thumbnail = book?.volumeInfo?.imageLinks?.medium || bookCover;
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth ? windowWidth < 800 : false;

  useEffect(() => {
    if (id) {
      fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch book details');
          }
          return response.json();
        })
        .then((data) => setBook(data))
        .catch((error) => {
          setError(error.message);
          dispatch(fetchBooksFailure(error.message));
        });
    }
  }, [id, dispatch]);

  if (error) {
    return null;
  }

  if (!book) {
    return <Loader />;
  }

  return (
    <div className={styles.bookDetails}>
      <Image
        src={thumbnail}
        alt={book.volumeInfo.title}
        width={isMobile ? 300 : 400}
        height={isMobile ? 450 : 600}
      />
      <div className={styles.info}>
        <p className={styles.categories}>
          {book.volumeInfo.categories?.join(', ') || ''}
        </p>
        <h2 className={styles.title}>{book.volumeInfo.title}</h2>
        <p className={styles.authors}>
          {book.volumeInfo.authors?.join('; ') || ''}
        </p>
      </div>
      {book.volumeInfo.description && (
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: book.volumeInfo.description
              .replace(/<\/p>/g, '<br />')
              .replace(/<p>/g, ''),
          }}
        />
      )}
      <a
        className={styles.details}
        href={book.volumeInfo.previewLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Details
      </a>
    </div>
  );
};

export default BookDetails;
