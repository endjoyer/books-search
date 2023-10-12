import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import BookInfo from '../../components/BookInfo';

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<any>(null);
  const thumbnail =
    book?.volumeInfo?.imageLinks?.thumbnail || '/src/images/form_bg.jpg';

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
      <BookInfo book={book} />
      <p>{book.volumeInfo.description}</p>
    </div>
  );
};

export default BookDetails;
