import React from 'react';

const BookInfo = ({ book }: { book: any }) => {
  return (
    <>
      <h2>{book.volumeInfo.title}</h2>
      <p>{book.volumeInfo.categories?.join(', ') || ''}</p>
      <p>{book.volumeInfo.authors?.join(', ') || ''}</p>
    </>
  );
};
export default BookInfo;
