import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../../components/common/Button/Button';

const CheckoutSuccessPage = () => {
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000)); // Generate random order number

  return (
    <div
      className="max-w-md mx-auto text-center py-12 bg-white rounded-tp shadow-tp"
      data-testid="checkout-success-page"
    >
      <FaCheckCircle className="text-success text-5xl mx-auto mb-4" data-testid="success-icon" />
      <h1 className="text-3xl font-bold mb-2 text-secondary-700" data-testid="success-title">
        Order Confirmed!
      </h1>
      <p className="text-xl mb-6 text-secondary-600" data-testid="success-message">
        Thank you for your purchase
      </p>

      <div className="bg-gray-50 p-6 mb-8 rounded-lg" data-testid="order-details">
        <p className="text-secondary-600 mb-2" data-testid="order-number">
          Order #{orderNumber}
        </p>
        <p className="text-secondary-600 mb-2">Confirmation has been sent to your email.</p>
        <p className="text-secondary-600">You can track your order status in your account.</p>
      </div>

      <div className="flex flex-col space-y-4">
        <Link to="/profile">
          <Button className="w-full" data-testid="track-order-button">
            Track Your Order
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outlined" className="w-full" data-testid="continue-shopping-button">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
