import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  removeFromCart, 
  updateQuantity 
} from '../../../store/slices/cartSlice';
import Button from '../../common/Button/Button';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, title, author, cover, price, quantity: initialQuantity } = item;
  const [quantity, setQuantity] = useState(initialQuantity);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      dispatch(updateQuantity({ id, quantity: value }));
    } else if (e.target.value === '') {
      // Разрешаем пустое поле во время ввода
      setQuantity('');
    }
  };
  
  const handleQuantityBlur = () => {
    // Если поле оставили пустым или с некорректным значением, восстанавливаем предыдущее значение
    if (quantity === '' || isNaN(quantity) || quantity < 1) {
      setQuantity(initialQuantity);
    }
  };
  
  const handleIncreaseQuantity = () => {
    const newQuantity = (typeof quantity === 'number' ? quantity : initialQuantity) + 1;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };
  
  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };
  
  return (
    <div 
      className="cart-item flex border-b border-gray-200 py-4"
      data-testid="cart-item"
    >
      <div className="flex-shrink-0 w-24 h-32">
        <img 
          src={cover} 
          alt={title} 
          className="w-full h-full object-cover"
          data-testid="cart-item-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/book-covers/placeholder.svg";
          }}
        />
      </div>
      
      <div className="flex-grow ml-4">
        <h3 
          className="text-lg font-medium text-secondary-700"
          data-testid="cart-item-title"
        >
          {title}
        </h3>
        <p 
          className="text-secondary-500 text-sm"
          data-testid="cart-item-author"
        >
          {author}
        </p>
        <div className="mt-2 flex items-center">
          <label htmlFor={`quantity-${id}`} className="mr-2 text-sm text-secondary-600">
            Quantity:
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
              id={`quantity-${id}`}
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              className="w-16 text-center border-y border-gray-300 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              data-testid="cart-item-quantity"
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
      </div>
      
      <div className="flex flex-col items-end ml-4">
        <span 
          className="text-lg font-bold text-primary-600"
          data-testid="cart-item-price"
        >
          ${(price * (typeof quantity === 'number' ? quantity : initialQuantity)).toFixed(2)}
        </span>
        <Button 
          onClick={handleRemove} 
          variant="text" 
          className="text-danger mt-2"
          data-testid="cart-item-remove"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
