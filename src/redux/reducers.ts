const initialState = {
  books: [],
  loading: false,
  error: null,
  query: '',
  category: 'all',
  sort: 'relevance',
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

    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload.query,
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload.category,
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload.sort,
      };
    default:
      return state;
  }
}
