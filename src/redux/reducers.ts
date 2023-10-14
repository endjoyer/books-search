import {
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_QUERY,
  SET_CATEGORY,
  SET_SORT,
  CLEAR_ERROR,
} from '../utils/constants';

export const initialState = {
  books: [],
  loading: false,
  error: null,
  query: '',
  category: 'all',
  sort: 'relevance',
  totalItems: 0,
};

export type RootState = ReturnType<typeof bookReducer>;

export function bookReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_BOOKS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.books,
        totalItems: action.payload.totalItems,
      };

    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        books: [],
      };

    case SET_QUERY:
      return {
        ...state,
        query: action.payload.query,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
      };
    case SET_SORT:
      return {
        ...state,
        sort: action.payload.sort,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
