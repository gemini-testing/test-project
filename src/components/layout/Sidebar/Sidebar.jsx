// src/components/layout/Sidebar/Sidebar.jsx
import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../../store/slices/bookSlice';
import { getAllAuthors } from '../../../mock/books';

const Sidebar = ({ className = '' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { genre } = useSelector(state => state.books.filters);
  
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
  
  // Получаем список авторов из мока данных
  const authors = getAllAuthors();
  
  const handleGenreClick = (selectedGenre) => {
    // Сохраняем текущие параметры поиска, если они есть
    const searchQuery = searchParams.get('search');
    const newParams = new URLSearchParams();
    
    if (searchQuery) {
      newParams.append('search', searchQuery);
    }
    
    if (selectedGenre !== 'All') {
      newParams.append('genre', selectedGenre);
    }
    
    // Обновляем URL с новыми параметрами
    navigate(`/?${newParams.toString()}`);
    
    // Обновляем фильтры в сторе
    dispatch(setFilter({ 
      genre: selectedGenre, 
      search: searchQuery || '' 
    }));
  };
  
  // Функция для преобразования имени автора в URL-безопасный формат
  const formatAuthorUrl = (author) => {
    return author.toLowerCase().replace(/\s+/g, '-');
  };
  
  return (
    <aside className={`${className} bg-white rounded-tp shadow-tp p-6`} data-testid="sidebar">
      <h2 className="text-xl font-bold mb-4 text-secondary-600">Categories</h2>
      
      <nav>
        <ul className="space-y-2">
          {genres.map((genreItem) => (
            <li key={genreItem}>
              <button
                className={`w-full text-left px-2 py-1 rounded transition-colors ${
                  genre === genreItem
                    ? 'bg-primary-100 text-primary-600 font-medium'
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
                className="text-secondary-600 hover:text-primary-500 transition-colors"
                data-testid={`author-${formatAuthorUrl(author)}`}
              >
                {author}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
        <h3 className="font-bold text-secondary-700 mb-2">Special Offer</h3>
        <p className="text-sm text-secondary-600 mb-3">
          Get 15% off on your first order with code WELCOME15
        </p>
        <Link 
          to="/special-offers"
          className="text-sm text-primary-600 font-semibold hover:text-primary-700"
          data-testid="special-offer-link"
        >
          View all offers →
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
