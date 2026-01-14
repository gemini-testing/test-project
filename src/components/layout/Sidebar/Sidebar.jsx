import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, clearFilters } from '../../../store/slices/bookSlice';
import { getAllAuthors } from '../../../mock/books';
import Button from '../../common/Button/Button';

const Sidebar = ({ className = '' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { genre, priceMin, priceMax } = useSelector(state => state.books.filters);
  const [localPriceMin, setLocalPriceMin] = useState(priceMin || '');
  const [localPriceMax, setLocalPriceMax] = useState(priceMax || '');

  const genres = [
    'All',
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Science Fiction',
    'Fantasy',
    'Romance',
    'Thriller',
    'Biography',
    'History',
    'Self-Help',
    'Children',
  ];

  const authors = getAllAuthors();

  const handleGenreClick = selectedGenre => {
    const searchQuery = searchParams.get('search');
    const newParams = new URLSearchParams();

    if (searchQuery) {
      newParams.append('search', searchQuery);
    }

    if (selectedGenre !== 'All') {
      newParams.append('genre', selectedGenre);
    }

    navigate(`/?${newParams.toString()}`);

    dispatch(
      setFilter({
        genre: selectedGenre,
        search: searchQuery || '',
      })
    );
  };

  const formatAuthorUrl = author => {
    return author.toLowerCase().replace(/\s+/g, '-');
  };

  const handlePriceFilterApply = () => {
    const minPrice = localPriceMin ? parseFloat(localPriceMin) : null;
    const maxPrice = localPriceMax ? parseFloat(localPriceMax) : null;

    dispatch(setFilter({ priceMin: minPrice, priceMax: maxPrice }));
  };

  const handleResetFilters = () => {
    dispatch(clearFilters());
    setLocalPriceMin('');
    setLocalPriceMax('');
    navigate('/');
  };

  return (
    <aside className={`${className} bg-white rounded-lg shadow-md p-6`} data-testid="sidebar">
      <h2 className="text-xl font-bold mb-4 text-secondary-600">Categories</h2>

      <nav>
        <ul className="space-y-2">
          {genres.map(genreItem => (
            <li key={genreItem}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  genre === genreItem
                    ? 'bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 font-semibold'
                    : 'text-secondary-600 hover:bg-gray-100'
                }`}
                onClick={() => handleGenreClick(genreItem)}
                data-testid={`genre-${genreItem.toLowerCase().replace(' ', '-')}`}
              >
                {genreItem}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-secondary-600">Authors</h2>
        <ul className="space-y-2">
          {authors.map(author => (
            <li key={author}>
              <Link
                to={`/author/${formatAuthorUrl(author)}`}
                className="text-secondary-600 hover:text-primary-600 transition-colors"
                data-testid={`author-${formatAuthorUrl(author)}`}
              >
                {author}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-secondary-600">Price Range</h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="price-min" className="block text-sm text-secondary-600 mb-1">
              Min Price ($)
            </label>
            <input
              id="price-min"
              type="number"
              min="0"
              step="0.01"
              value={localPriceMin}
              onChange={e => setLocalPriceMin(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              data-testid="price-min-input"
            />
          </div>
          <div>
            <label htmlFor="price-max" className="block text-sm text-secondary-600 mb-1">
              Max Price ($)
            </label>
            <input
              id="price-max"
              type="number"
              min="0"
              step="0.01"
              value={localPriceMax}
              onChange={e => setLocalPriceMax(e.target.value)}
              placeholder="100.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              data-testid="price-max-input"
            />
          </div>
          <Button onClick={handlePriceFilterApply} className="w-full" size="sm" data-testid="apply-price-filter-button">
            Apply Price Filter
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={handleResetFilters} variant="outlined" className="w-full" data-testid="reset-filters-button">
          Reset All Filters
        </Button>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg border-2 border-primary-200">
        <h3 className="font-bold text-primary-800 mb-2">Special Offer</h3>
        <p className="text-sm text-secondary-700 mb-3">Get 15% off on your first order with code WELCOME15</p>
        <Link
          to="/special-offers"
          className="text-sm text-primary-700 font-semibold hover:text-primary-800 transition-colors inline-flex items-center"
          data-testid="special-offer-link"
        >
          View all offers →
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
