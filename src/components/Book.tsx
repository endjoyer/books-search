import './Book.module.css';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BookInfo from './BookInfo';

const Book = React.memo(function Book({ book }: { book: any }) {
  const router = useRouter();
  const thumbnail =
    book?.volumeInfo?.imageLinks?.thumbnail || '/src/images/form_bg.jpg';

  const handleClick = () => {
    router.push(`/book/${book.id}`);
  };

  return (
    <div onClick={handleClick}>
      <Image
        src={thumbnail}
        alt={book.volumeInfo.title}
        width={100}
        height={100}
      />
      <BookInfo book={book} />
    </div>
  );
});

export default Book;
