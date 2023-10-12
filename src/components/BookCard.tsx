import React from 'react';
import Image from 'next/image';
import styles from './BookCard.module.css';
import { useRouter } from 'next/navigation';

const BookCard = ({ book }) => {
  const router = useRouter();
  const thumbnail =
    book?.volumeInfo?.imageLinks?.thumbnail || '/src/images/form_bg.jpg';

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
        <p className={styles.category}>
          {book.volumeInfo.categories?.[0] || 'No category'}
        </p>
        <h2 className={styles.title}>{book.volumeInfo.title}</h2>
        <p className={styles.authors}>
          {book.volumeInfo.authors?.join(', ') || 'No authors'}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
