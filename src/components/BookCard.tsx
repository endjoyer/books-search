import React from 'react';
import Image from 'next/image';
import styles from './BookCard.module.css';
import bookCover from '../images/defolt-book.png';
import { useRouter } from 'next/navigation';

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
};

type Props = {
  book: Book;
};

const BookCard = ({ book }: Props) => {
  const router = useRouter();
  const thumbnail = book?.volumeInfo?.imageLinks?.thumbnail || bookCover;

  const handleClick = () => {
    router.push(`/book/${book.id}`);
  };

  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={thumbnail}
        alt={book.volumeInfo.title}
        width={100}
        height={150}
        onClick={handleClick}
      />
      <div className={styles.info}>
        <p className={`${styles.category} ${styles.truncate}`}>
          {book.volumeInfo.categories?.[0] || ''}
        </p>
        <h2 className={`${styles.title} ${styles.truncate}`}>
          {book.volumeInfo.title}
        </h2>
        <p className={`${styles.authors} ${styles.truncate}`}>
          {book.volumeInfo.authors?.join(', ') || ''}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
