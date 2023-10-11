import React from 'react';
import { useRouter } from 'next/navigation';

const Book = ({ book }: { book: any }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/book/${book.id}`);
  };
  console.log(book);

  return (
    <div onClick={handleClick}>
      <img src={book.volumeInfo.previewLink} alt={book.volumeInfo.title} />
      <h2>{book.volumeInfo.title}</h2>
    </div>
  );
};

export default Book;
