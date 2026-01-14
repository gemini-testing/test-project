import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchBooks, setFilter } from '../../store/slices/bookSlice';
import BookList from '../../components/books/BookList/BookList';

const CategoryPage = () => {
  const { genre } = useParams();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.books);

  // Convert URL parameter to correct genre format
  // Handle cases with hyphens (non-fiction -> Non-Fiction)
  const formattedGenre = genre
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');

  useEffect(() => {
    // Set genre filter
    dispatch(setFilter({ genre: formattedGenre, search: '' }));

    // Load books with new filter
    dispatch(fetchBooks({ genre: formattedGenre }));
  }, [dispatch, formattedGenre]);

  return (
    <div data-testid="category-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-secondary-700">{formattedGenre} Books</h1>
        <Link to="/" className="text-primary-500 hover:text-primary-600">
          &larr; Back to all books
        </Link>
      </div>

      {status === 'failed' && (
        <div className="p-4 bg-red-100 text-danger rounded-tp mb-4" data-testid="error-message">
          {error || 'Failed to load books. Please try again later.'}
        </div>
      )}

      {status === 'loading' ? (
        <div className="flex justify-center py-12" data-testid="loading-indicator">
          <div className="loader animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {items.length > 0 ? (
            <BookList books={items} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg" data-testid="no-books-message">
              <h2 className="text-xl font-medium text-secondary-600 mb-2">No books found in this category</h2>
              <p className="text-secondary-500">
                We don't have any {formattedGenre.toLowerCase()} books at the moment.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
