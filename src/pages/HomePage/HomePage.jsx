import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchBooks, setFilter, setPage, setSortBy } from '../../store/slices/bookSlice';
import BookList from '../../components/books/BookList/BookList';
import Button from '../../components/common/Button/Button';

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { items, status, error, filters, pagination } = useSelector(state => state.books);

  // Calculate pagination
  const { currentPage, itemsPerPage } = pagination;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = items.slice(startIndex, endIndex);

  // Track changes in URL parameters
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    const genreQuery = searchParams.get('genre');

    // Check if filters need to be updated
    const shouldUpdateFilters =
      searchQuery !== filters.search || (genreQuery !== filters.genre && (genreQuery || filters.genre !== 'All'));

    if (shouldUpdateFilters) {
      const newFilters = {
        search: searchQuery || '',
        genre: genreQuery || 'All',
      };

      dispatch(setFilter(newFilters));
    }
  }, [searchParams, dispatch, filters.search, filters.genre]);

  // Load books when filters change
  useEffect(() => {
    dispatch(fetchBooks(filters));
  }, [dispatch, filters]);

  const handleSortChange = e => {
    dispatch(setSortBy(e.target.value));
  };

  const handlePageChange = page => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div data-testid="home-page">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-secondary-700">Welcome to BookStore</h1>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-secondary-600">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={handleSortChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              data-testid="sort-select"
            >
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="title-az">Title: A-Z</option>
              <option value="title-za">Title: Z-A</option>
            </select>
          </div>
        </div>

        {filters.search && (
          <p className="text-lg text-secondary-600" data-testid="search-results-info">
            Search results for: <span className="font-semibold">"{filters.search}"</span>
          </p>
        )}

        {filters.genre && filters.genre !== 'All' && (
          <p className="text-lg text-secondary-600" data-testid="genre-filter-info">
            Genre: <span className="font-semibold">{filters.genre}</span>
          </p>
        )}

        {(filters.priceMin || filters.priceMax) && (
          <p className="text-lg text-secondary-600" data-testid="price-filter-info">
            Price range:
            <span className="font-semibold">
              {' '}
              ${filters.priceMin || '0'} - ${filters.priceMax || '∞'}
            </span>
          </p>
        )}
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
            <>
              <div className="mb-4 text-sm text-secondary-600" data-testid="results-count">
                Showing {startIndex + 1}-{Math.min(endIndex, items.length)} of {items.length} books
              </div>

              <BookList books={displayedBooks} />

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2" data-testid="pagination">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    size="sm"
                    variant="outlined"
                    data-testid="prev-page-button"
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    // Show first page, last page, current page, and pages around current
                    const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;

                    if (!showPage) {
                      // Show ellipsis for skipped pages
                      const isBeforeCurrent = page < currentPage;
                      const isAfterCurrent = page > currentPage;
                      const showEllipsisBefore = isBeforeCurrent && page === 2 && currentPage > 3;
                      const showEllipsisAfter =
                        isAfterCurrent && page === totalPages - 1 && currentPage < totalPages - 2;

                      if (showEllipsisBefore || showEllipsisAfter) {
                        return (
                          <span key={page} className="px-2">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        size="sm"
                        variant={currentPage === page ? 'primary' : 'outlined'}
                        data-testid={`page-${page}-button`}
                      >
                        {page}
                      </Button>
                    );
                  })}

                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    size="sm"
                    variant="outlined"
                    data-testid="next-page-button"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg" data-testid="no-books-message">
              <h2 className="text-xl font-medium text-secondary-600 mb-2">No books found</h2>
              <p className="text-secondary-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
