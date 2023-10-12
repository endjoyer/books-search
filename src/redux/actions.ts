import {
  API_KEY,
  API_URL,
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_QUERY,
  SET_CATEGORY,
  SET_SORT,
} from '../utils/constants';

export const fetchBooks = (
  query: string,
  category: string,
  sort: string,
  startIndex = 0
) => {
  return (dispatch: any) => {
    dispatch(fetchBooksBegin());

    return fetch(
      `${API_URL}?q=${query}+subject=${category}&orderBy=${sort}&startIndex=${startIndex}&key=${API_KEY}`
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
  type: FETCH_BOOKS_BEGIN,
});

export const fetchBooksSuccess = (books: any) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books },
});

export const fetchBooksFailure = (error: any) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: { error },
});

export const setQuery = (query: string) => ({
  type: SET_QUERY,
  payload: { query },
});

export const setCategory = (category: string) => ({
  type: SET_CATEGORY,
  payload: { category },
});

export const setSort = (sort: string) => ({
  type: SET_SORT,
  payload: { sort },
});

export const loadMoreBooks = (
  query: string,
  category: string,
  sort: string,
  startIndex: number
) => {
  return (dispatch: any, getState: any) => {
    const { books } = getState();
    if (books.length > startIndex) {
      dispatch(fetchBooksSuccess(books.slice(0, startIndex + 30)));
    } else {
      return fetch(
        `${API_URL}?q=${query}+subject=${category}&orderBy=${sort}&startIndex=${startIndex}&key=${API_KEY}`
      )
        .then(handleErrors)
        .then((res) => res.json())
        .then((json) => {
          dispatch(fetchBooksSuccess([...books, ...json.items]));
          return json.items;
        })
        .catch((error) => dispatch(fetchBooksFailure(error)));
    }
  };
};
