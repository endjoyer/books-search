const initialState = {
  books: [],
  loading: false,
  error: null,
};

export default function bookReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'FETCH_BOOKS_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        loading: false,
        books: action.payload.books,
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        books: [],
      };

    default:
      return state;
  }
}
