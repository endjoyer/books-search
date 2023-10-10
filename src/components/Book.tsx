import React from 'react';
import { useRouter } from 'next/router';

const Book = ({ book }: { book: any }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/book/${book.id}`);
  };

  return (
    <div onClick={handleClick}>
      <img
        src={book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
      />
      <h2>{book.volumeInfo.title}</h2>
      <p>{book.volumeInfo.categories[0]}</p>
      <p>{book.volumeInfo.authors.join(', ')}</p>
    </div>
  );
};

export default Book;
