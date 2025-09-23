import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../store/slices/cartSlice';
import Rating from '../../common/Rating/Rating';
import Button from '../../common/Button/Button';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { id, title, author, cover, price, rating } = book;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...book, quantity: 1 }));
  };

  return (
    <div 
      className="book-card bg-white rounded-tp shadow-tp overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105"
      data-testid="book-card"
    >
      <Link to={`/books/${id}`} className="block h-full">
        <div className="relative pt-[140%]">
          <img 
            src={cover} 
            alt={title} 
            className="absolute top-0 left-0 w-full h-full object-cover"
            data-testid="book-cover"
            onError={(e) => {
              e.target.onerror = null; // предотвращает бесконечный цикл
              e.target.src = "/images/book-covers/placeholder.svg";
            }}
          />
        </div>
        <div className="p-4">
          <h3 
            className="text-lg font-semibold line-clamp-2 mb-1 text-secondary-700"
            data-testid="book-title"
          >
            {title}
          </h3>
          <p 
            className="text-gray-600 text-sm mb-2"
            data-testid="book-author"
          >
            {author}
          </p>
          <div className="flex items-center justify-between mb-3">
            <Rating value={rating} />
            <span 
              className="font-bold text-primary-600"
              data-testid="book-price"
            >
              ${price.toFixed(2)}
            </span>
          </div>
          <Button 
            onClick={handleAddToCart}
            className="w-full"
            data-testid="add-to-cart-button"
          >
            Add to Cart
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
