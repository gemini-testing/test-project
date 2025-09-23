// src/pages/AuthorPage/AuthorPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBooksByAuthor, getAuthorNameFromSlug } from '../../mock/books';
import BookList from '../../components/books/BookList/BookList';

const AuthorPage = () => {
  const { authorSlug } = useParams();
  const [author, setAuthor] = useState('');
  const [authorBooks, setAuthorBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Имитируем загрузку данных
    setTimeout(() => {
      try {
        // Получаем имя автора из slug
        const authorName = getAuthorNameFromSlug(authorSlug);
        
        if (!authorName) {
          // Если автор не найден, пытаемся преобразовать slug в читаемое имя
          const decodedAuthorName = authorSlug
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
          setAuthor(decodedAuthorName);
          setAuthorBooks([]);
        } else {
          // Если автор найден, получаем его книги
          const books = getBooksByAuthor(authorName);
          setAuthor(authorName);
          setAuthorBooks(books);
        }
      } catch (error) {
        console.error('Error loading author books:', error);
        setAuthorBooks([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // Небольшая задержка для имитации загрузки
  }, [authorSlug]);
  
  return (
    <div data-testid="author-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-secondary-700">Books by {author}</h1>
        <Link to="/" className="text-primary-500 hover:text-primary-600">&larr; Back to all books</Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12" data-testid="loading-indicator">
          <div className="loader animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {authorBooks.length > 0 ? (
            <BookList books={authorBooks} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg" data-testid="no-books-message">
              <h2 className="text-xl font-medium text-secondary-600 mb-2">No books found</h2>
              <p className="text-secondary-500">
                We don't have any books by {author} at the moment.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AuthorPage;
