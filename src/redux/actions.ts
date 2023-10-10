export const fetchBooks = (
  query: string,
  category: string,
  sort: string,
  startIndex = 0
) => {
  return (dispatch: any) => {
    dispatch(fetchBooksBegin());
    return fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${category}&orderBy=${sort}&startIndex=${startIndex}`
    )
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchBooksSuccess(json.items));
        return json.items;
      })
      .catch((error) => dispatch(fetchBooksFailure(error)));
  };
};

function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchBooksBegin = () => ({
  type: 'FETCH_BOOKS_BEGIN',
});

export const fetchBooksSuccess = (books: any) => ({
  type: 'FETCH_BOOKS_SUCCESS',
  payload: { books },
});

export const fetchBooksFailure = (error: any) => ({
  type: 'FETCH_BOOKS_FAILURE',
  payload: { error },
});

export const loadMoreBooks = (
  query: string,
  category: string,
  sort: string,
  startIndex: number
) => {
  return (dispatch: any, getState: any) => {
    const { books } = getState();
    return fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${category}&orderBy=${sort}&startIndex=${startIndex}`
    )
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchBooksSuccess([...books, ...json.items]));
        return json.items;
      })
      .catch((error) => dispatch(fetchBooksFailure(error)));
  };
};
