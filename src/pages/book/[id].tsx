import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<any>(null);
  const thumbnail =
    book.volumeInfo?.imageLinks?.thumbnail || '../images/form_bg.jpg';

  useEffect(() => {
    if (id) {
      fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then((response) => response.json())
        .then((data) => setBook(data));
    }
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      <p>{book.volumeInfo.description}</p>
    </div>
  );
};

export default BookDetails;
