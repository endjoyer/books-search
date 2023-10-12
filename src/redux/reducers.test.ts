import {
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_SUCCESS,
} from '@/utils/constants';
import { bookReducer, initialState } from './reducers';

describe('book reducer', () => {
  it('should return the initial state', () => {
    expect(bookReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_BOOKS_BEGIN', () => {
    expect(
      bookReducer(initialState, {
        type: FETCH_BOOKS_BEGIN,
      })
    ).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('should handle FETCH_BOOKS_SUCCESS', () => {
    const books = [{ id: 1, title: 'Test Book' }];
    expect(
      bookReducer(initialState, {
        type: FETCH_BOOKS_SUCCESS,
        payload: { books },
      })
    ).toEqual({
      ...initialState,
      loading: false,
      books,
    });
  });

  it('should handle FETCH_BOOKS_FAILURE', () => {
    const error = 'Test error';
    expect(
      bookReducer(initialState, {
        type: FETCH_BOOKS_FAILURE,
        payload: { error },
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error,
      books: [],
    });
  });
});
