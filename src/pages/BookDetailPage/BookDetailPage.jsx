import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById } from '../../store/slices/bookSlice';
import { addToCart } from '../../store/slices/cartSlice';
import Rating from '../../components/common/Rating/Rating';
import Button from '../../components/common/Button/Button';

const BookDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBook, status, error } = useSelector(state => state.books);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);
  
  useEffect(() => {
    // When book data is loaded, set the default format to the first one
    if (selectedBook?.formats?.length > 0) {
      setSelectedFormat(selectedBook.formats[0]);
    }
  }, [selectedBook]);
  
  const handleAddToCart = () => {
    if (selectedBook && selectedFormat) {
      dispatch(addToCart({
        id: selectedBook.id,
        title: selectedBook.title,
        author: selectedBook.author,
        cover: selectedBook.cover,
        price: selectedFormat.price,
        quantity,
        format: selectedFormat.type
      }));
    }
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === '') {
      // Разрешаем пустое поле во время ввода
      setQuantity('');
    }
  };
  
  const handleQuantityBlur = () => {
    // Если поле оставили пустым или с некорректным значением, ставим 1
    if (quantity === '' || isNaN(quantity) || quantity < 1) {
      setQuantity(1);
    }
  };
  
  if (status === 'loading') {
    return (
      <div className="flex justify-center py-12" data-testid="loading-indicator">
        <div className="loader animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (status === 'failed') {
    return (
      <div className="p-4 bg-red-100 text-danger rounded-tp mb-4" data-testid="error-message">
        {error || 'Failed to load book details. Please try again later.'}
      </div>
    );
  }
  
  if (!selectedBook) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg" data-testid="no-book-message">
        <h2 className="text-xl font-medium text-secondary-700 mb-2">Book not found</h2>
        <p className="text-secondary-500 mb-4">
          The book you're looking for might have been removed or doesn't exist.
        </p>
        <Link 
          to="/"
          className="btn"
          data-testid="back-to-home"
        >
          Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-tp shadow-tp overflow-hidden" data-testid="book-detail-page">
      <div className="flex flex-col md:flex-row">
        {/* Book Cover */}
        <div className="md:w-1/3 p-6 flex justify-center">
          <div className="w-full max-w-xs">
            <img 
              src={selectedBook.cover} 
              alt={selectedBook.title} 
              className="w-full h-auto object-cover rounded-lg shadow-tp"
              data-testid="book-cover"
              onError={(e) => {
                e.target.onerror = null; // предотвращает бесконечный цикл
                e.target.src = "/images/book-covers/placeholder.svg";
              }}
            />
          </div>
        </div>
        
        {/* Book Details */}
        <div className="md:w-2/3 p-6">
          <h1 
            className="text-3xl font-bold mb-2 text-secondary-700"
            data-testid="book-title"
          >
            {selectedBook.title}
          </h1>
          
          <p 
            className="text-xl text-secondary-500 mb-3"
            data-testid="book-author"
          >
            by {selectedBook.author}
          </p>
          
          <div className="flex items-center mb-4">
            <Rating value={selectedBook.rating} />
            <span className="ml-2 text-secondary-500">
              ({selectedBook.reviews?.length || 0} reviews)
            </span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-secondary-600">Description</h2>
            <p 
              className="text-secondary-600"
              data-testid="book-description"
            >
              {selectedBook.description}
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-secondary-600">Book Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-secondary-500">Publisher:</p>
                <p className="font-medium text-secondary-700" data-testid="book-publisher">{selectedBook.publisher}</p>
              </div>
              <div>
                <p className="text-secondary-500">Publication Year:</p>
                <p className="font-medium text-secondary-700" data-testid="book-year">{selectedBook.year}</p>
              </div>
              <div>
                <p className="text-secondary-500">ISBN:</p>
                <p className="font-medium text-secondary-700" data-testid="book-isbn">{selectedBook.isbn}</p>
              </div>
              <div>
                <p className="text-secondary-500">Pages:</p>
                <p className="font-medium text-secondary-700" data-testid="book-pages">{selectedBook.pages}</p>
              </div>
              <div>
                <p className="text-secondary-500">Genre:</p>
                <p className="font-medium text-secondary-700" data-testid="book-genre">{selectedBook.genre}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-secondary-600">Choose Format</h2>
            <div className="flex flex-wrap gap-2">
              {selectedBook.formats.map(format => (
                <button
                  key={format.type}
                  type="button"
                  className={`px-4 py-2 rounded-tp border ${
                    selectedFormat?.type === format.type
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-gray-300 text-secondary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedFormat(format)}
                  data-testid={`format-option-${format.type}`}
                >
                  {format.type} - ${format.price.toFixed(2)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-end mb-6">
            <div className="mr-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-secondary-600 mb-1">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  className="px-2 py-1 border border-gray-300 rounded-l-tp bg-gray-50 text-secondary-700 hover:bg-gray-100"
                  data-testid="decrease-quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  onBlur={handleQuantityBlur}
                  className="w-16 text-center border-y border-gray-300 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  data-testid="quantity-input"
                />
                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  className="px-2 py-1 border border-gray-300 rounded-r-tp bg-gray-50 text-secondary-700 hover:bg-gray-100"
                  data-testid="increase-quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-primary-600" data-testid="book-price">
                ${selectedFormat ? (selectedFormat.price * quantity).toFixed(2) : '0.00'}
              </h2>
            </div>
          </div>
          
          <Button
            onClick={handleAddToCart}
            className="px-8 py-3 text-lg"
            disabled={!selectedFormat}
            data-testid="add-to-cart-button"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="p-6 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-secondary-700">Customer Reviews</h2>
        
        {selectedBook.reviews && selectedBook.reviews.length > 0 ? (
          <div className="space-y-6" data-testid="reviews-list">
            {selectedBook.reviews.map((review, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-secondary-600">{review.user}</div>
                  <Rating value={review.rating} size="sm" />
                </div>
                <p className="text-secondary-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-secondary-500" data-testid="no-reviews-message">
            There are no reviews yet for this book.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;
