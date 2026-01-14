import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../../store/slices/cartSlice';
import CartItem from '../../components/cart/CartItem/CartItem';
import Button from '../../components/common/Button/Button';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalItems } = useSelector(state => state.cart);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-tp shadow-tp" data-testid="empty-cart">
        <h1 className="text-3xl font-bold mb-4 text-secondary-700">Your Cart</h1>
        <p className="text-secondary-500 mb-6">Your cart is currently empty.</p>
        <Link to="/" className="btn" data-testid="continue-shopping-button">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-tp shadow-tp overflow-hidden" data-testid="cart-page">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-secondary-700" data-testid="cart-page-title">
          Your Cart
        </h1>
      </div>

      <div className="p-6">
        <div className="mb-6">
          {items.map(item => (
            <CartItem key={`${item.id}-${item.format || ''}`} item={item} />
          ))}
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <Button
            variant="text"
            onClick={handleClearCart}
            className="text-danger hover:text-danger"
            data-testid="clear-cart-button"
          >
            Clear Cart
          </Button>

          <div>
            <div className="text-lg mb-1">
              Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
              <span className="font-bold text-primary-600 ml-2" data-testid="cart-subtotal">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-secondary-500">Shipping and taxes calculated at checkout</div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Link
            to="/"
            className="px-6 inline-flex items-center justify-center font-medium rounded-tp focus:outline-none bg-transparent border border-secondary-500 text-secondary-500 hover:bg-secondary-50 py-2"
            data-testid="continue-shopping-link"
          >
            Continue Shopping
          </Link>

          <Link
            to="/checkout"
            className="px-6 inline-flex items-center justify-center font-medium rounded-tp focus:outline-none bg-primary-500 hover:bg-primary-600 text-white shadow-tp py-2"
            data-testid="checkout-button"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
