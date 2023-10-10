import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
      />
      <h2>{book.volumeInfo.title}</h2>
      <p>{book.volumeInfo.categories.join(', ')}</p>
      <p>{book.volumeInfo.authors.join(', ')}</p>
      <p>{book.volumeInfo.description}</p>
    </div>
  );
};

export default BookDetails;
