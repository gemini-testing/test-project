import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../store/slices/cartSlice';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with dashes
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '');
      const limited = cleaned.substring(0, 16);
      const formatted = limited.match(/.{1,4}/g);
      formattedValue = formatted ? formatted.join('-') : limited;
    }

    // Format expiry date with slash
    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      const limited = cleaned.substring(0, 4);
      if (limited.length >= 2) {
        formattedValue = limited.substring(0, 2) + '/' + limited.substring(2);
      } else {
        formattedValue = limited;
      }
    }

    // Format CVV (digits only)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate shipping information
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    // Validate payment information
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';

    // Validate card number (should be 16 digits with optional spaces/dashes)
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else {
      const cardNumber = formData.cardNumber.replace(/[\s-]/g, '');
      if (!/^\d{16}$/.test(cardNumber)) {
        newErrors.cardNumber = 'Card number must be 16 digits (format: 0000-0000-0000-0000)';
      }
    }

    // Validate expiry date (MM/YY format)
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    } else {
      // Check if card is expired
      const [month, year] = formData.expiryDate.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const now = new Date();
      if (expiry < now) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // Validate CVV (3-4 digits)
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);

    try {
      // Clear cart after successful order
      dispatch(clearCart());

      // Redirect to success page
      navigate('/checkout/success');
    } catch {
      alert('There was an error processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="bg-white rounded-tp shadow-tp overflow-hidden" data-testid="checkout-page">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-secondary-700">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Shipping Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-secondary-700">Shipping Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
                data-testid="first-name-input"
              />

              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
                data-testid="last-name-input"
              />
            </div>

            <Input
              label="Email Address"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              data-testid="email-input"
            />

            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              required
              data-testid="address-input"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                required
                data-testid="city-input"
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-tp shadow-sm border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-300 focus:ring-opacity-50"
                  data-testid="country-select"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Russia">Russia</option>
                </select>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 mt-8 text-secondary-700">Payment Information</h2>

            <Input
              label="Name on Card"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              error={errors.cardName}
              required
              data-testid="card-name-input"
            />

            <Input
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              error={errors.cardNumber}
              placeholder="XXXX XXXX XXXX XXXX"
              required
              data-testid="card-number-input"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                error={errors.expiryDate}
                placeholder="MM/YY"
                required
                data-testid="expiry-date-input"
              />

              <Input
                label="CVV"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                error={errors.cvv}
                placeholder="123"
                required
                data-testid="cvv-input"
              />
            </div>
          </div>

          {/* Right column - Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-secondary-700">Order Summary</h2>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="max-h-60 overflow-y-auto mb-4">
                {items.map(item => (
                  <div
                    key={`${item.id}-${item.format || ''}`}
                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-10 h-14 object-cover rounded mr-3"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = '/images/book-covers/placeholder.svg';
                        }}
                      />
                      <div>
                        <p className="font-medium line-clamp-1 text-secondary-700">{item.title}</p>
                        <p className="text-xs text-secondary-500">
                          {item.format ? `${item.format} · ` : ''}
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="font-medium text-secondary-700">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-secondary-600">Subtotal</span>
                  <span className="text-secondary-700">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-secondary-600">Shipping</span>
                  <span className="text-secondary-700">${(totalAmount > 50 ? 0 : 5.99).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-secondary-600">Tax</span>
                  <span className="text-secondary-700">${(totalAmount * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                  <span className="text-secondary-700">Total</span>
                  <span className="text-primary-600" data-testid="order-total">
                    ${(totalAmount + (totalAmount > 50 ? 0 : 5.99) + totalAmount * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full py-3 text-lg" disabled={loading} data-testid="place-order-button">
              {loading ? 'Processing...' : 'Place Order'}
            </Button>

            <p className="text-sm text-secondary-500 text-center mt-4">
              By placing your order, you agree to our{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
