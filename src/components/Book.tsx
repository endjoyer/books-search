import React from 'react';
import Image from 'next/image';
import BookInfo from './BookInfo';

const Book = React.memo(function Book({ book }: { book: any }) {
  const thumbnail =
    book?.volumeInfo?.imageLinks?.thumbnail || '/src/images/form_bg.jpg';

  return (
    <div>
      <Image
        src={thumbnail}
        alt={book.volumeInfo.title}
        width={100}
        height={150}
      />
      <BookInfo book={book} />
    </div>
  );
});

export default Book;
