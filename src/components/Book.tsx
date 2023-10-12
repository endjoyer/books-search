import './Book.module.css';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Book = ({ book }: { book: any }) => {
  const router = useRouter();
  const thumbnail =
    book.volumeInfo?.imageLinks?.thumbnail || '../images/form_bg.jpg';

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
      <h2>{book.volumeInfo.title}</h2>
      {/* join(', ') выдает ошибку. надо исправить!*/}
      {/* <p>{book.volumeInfo.categories.join(', ')}</p>
      <p>{book.volumeInfo.authors.join(', ')}</p> */}
    </div>
  );
};

export default Book;
