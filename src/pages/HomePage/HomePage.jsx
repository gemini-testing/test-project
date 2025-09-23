import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchBooks, setFilter } from '../../store/slices/bookSlice';
import BookList from '../../components/books/BookList/BookList';

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { items, status, error, filters } = useSelector(state => state.books);
  const [isLoading, setIsLoading] = useState(true);
  
  // Отслеживаем изменения в URL-параметрах
  useEffect(() => {
    // Получаем параметры поиска из URL
    const searchQuery = searchParams.get('search');
    const genreQuery = searchParams.get('genre');
    
    // Проверяем, нужно ли обновлять фильтры
    const shouldUpdateFilters = 
      (searchQuery !== filters.search) || 
      (genreQuery !== filters.genre && (genreQuery || filters.genre !== 'All'));
    
    if (shouldUpdateFilters) {
      // Обновляем фильтры в сторе на основе URL-параметров
      const newFilters = {
        search: searchQuery || '',
        genre: genreQuery || 'All'
      };
      
      dispatch(setFilter(newFilters));
    }
  }, [searchParams, dispatch, filters.search, filters.genre]);
  
  // Загружаем книги при изменении фильтров
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchBooks(filters))
      .finally(() => setIsLoading(false));
  }, [dispatch, filters.genre, filters.search]);
  
  return (
    <div data-testid="home-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-secondary-700">Welcome to BookStore</h1>
        
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
      </div>
      
      {status === 'failed' && (
        <div className="p-4 bg-red-100 text-danger rounded-tp mb-4" data-testid="error-message">
          {error || 'Failed to load books. Please try again later.'}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center py-12" data-testid="loading-indicator">
          <div className="loader animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {items.length > 0 ? (
            <BookList books={items} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg" data-testid="no-books-message">
              <h2 className="text-xl font-medium text-secondary-600 mb-2">No books found</h2>
              <p className="text-secondary-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
