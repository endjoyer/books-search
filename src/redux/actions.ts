import {
  API_KEY,
  API_URL,
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_QUERY,
  SET_CATEGORY,
  SET_SORT,
  CLEAR_ERROR,
} from '../utils/constants';

export const fetchBooks = (
  query: string,
  category: string,
  sort: string,
  startIndex = 0
) => {
  return async (dispatch: any) => {
    dispatch(fetchBooksBegin());

    try {
      const response = await fetch(
        `${API_URL}?q=${query}+subject=${category}&orderBy=${sort}&startIndex=${startIndex}&maxResults=30&key=${API_KEY}`
      );
      handleErrors(response);
      const json = await response.json();
      dispatch(fetchBooksSuccess(json.items, json.totalItems)); // обновляем totalItems
      return json.items;
    } catch (error) {
      dispatch(fetchBooksFailure(error.message));
    }
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

export const fetchBooksSuccess = (books: any, totalItems: number) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books, totalItems },
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
  return async (dispatch: any, getState: any) => {
    const { books, totalItems } = getState(); // получаем totalItems из состояния
    if (books.length > startIndex) {
      dispatch(fetchBooksSuccess(books.slice(0, startIndex + 30), totalItems)); // передаем текущее значение totalItems
    } else {
      try {
        const response = await fetch(
          `${API_URL}?q=${query}+subject=${category}&orderBy=${sort}&startIndex=${startIndex}&maxResults=30&key=${API_KEY}`
        );
        handleErrors(response);
        const json = await response.json();
        dispatch(fetchBooksSuccess([...books, ...json.items], totalItems)); // передаем текущее значение totalItems
        return json.items;
      } catch (error) {
        dispatch(fetchBooksFailure(error.message));
      }
    }
  };
};

export const clearError = () => ({
  type: CLEAR_ERROR,
});
