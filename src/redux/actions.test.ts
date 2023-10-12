import { FETCH_BOOKS_BEGIN } from '@/utils/constants';
import { fetchBooks } from './actions';

describe('fetchBooks action', () => {
  it('should dispatch the correct action', () => {
    const dispatch = jest.fn();
    const expectedAction = {
      type: FETCH_BOOKS_BEGIN,
    };

    // Mock the fetch call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ items: [] }),
      })
    );

    fetchBooks('test', 'all', 'relevance')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
