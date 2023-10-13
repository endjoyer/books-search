'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BookInfo from '../../../components/BookInfo';
import styles from './BookDetails.module.css';

type Props = {
  params: {
    id: string;
  };
};
const BookDetails = ({ params: { id } }: Props) => {
  const [book, setBook] = useState<any>(null);
  const [error, setError] = useState(null);
  const thumbnail =
    book?.volumeInfo?.imageLinks?.large || '/src/images/form_bg.jpg';

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
        .catch((error) => setError(error.message));
    }
  }, [id]);

  if (error) {
    return <div>Error! {error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.bookDetails}>
        <Image
          src={thumbnail}
          alt={book.volumeInfo.title}
          width={400}
          height={600}
        />
        <div className={styles.info}>
          <BookInfo book={book} />
          <p className={styles.description}>{book.volumeInfo.description}</p>
        </div>
      </div>
    </>
  );
};

export default BookDetails;