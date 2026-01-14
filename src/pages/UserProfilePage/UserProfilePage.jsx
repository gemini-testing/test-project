import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';

const UserProfilePage = () => {
  const { user } = useSelector(state => state.auth);

  const [activeTab, setActiveTab] = useState('profile');

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Address state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true,
    },
  ]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handleChangePassword = e => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    // Validate new password and confirm password match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    // Validate password length
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    // Simulate password change (mock - no actual validation of current password)
    setPasswordSuccess('Password changed successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleAddressInputChange = e => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = e => {
    e.preventDefault();

    // Validate all fields are filled
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      alert('Please fill in all address fields');
      return;
    }

    // Add new address
    const address = {
      id: addresses.length + 1,
      ...newAddress,
      isDefault: addresses.length === 0,
    };

    setAddresses(prev => [...prev, address]);

    // Reset form
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
    });
    setShowAddressForm(false);
  };

  const handleSetDefaultAddress = id => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDeleteAddress = id => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" data-testid="user-profile-page">
      <div className="p-6 border-b border-secondary-200">
        <h1 className="text-3xl font-bold">My Account</h1>
      </div>

      <div className="flex border-b border-secondary-200">
        <button
          className={`py-3 px-6 font-medium text-center ${
            activeTab === 'profile'
              ? 'border-b-2 border-primary-600 text-primary-700'
              : 'text-secondary-600 hover:text-primary-600'
          }`}
          onClick={() => setActiveTab('profile')}
          data-testid="profile-tab"
        >
          Profile
        </button>
        <button
          className={`py-3 px-6 font-medium text-center ${
            activeTab === 'orders'
              ? 'border-b-2 border-primary-600 text-primary-700'
              : 'text-secondary-600 hover:text-primary-600'
          }`}
          onClick={() => setActiveTab('orders')}
          data-testid="orders-tab"
        >
          Orders
        </button>
        <button
          className={`py-3 px-6 font-medium text-center ${
            activeTab === 'addresses'
              ? 'border-b-2 border-primary-600 text-primary-700'
              : 'text-secondary-600 hover:text-primary-600'
          }`}
          onClick={() => setActiveTab('addresses')}
          data-testid="addresses-tab"
        >
          Addresses
        </button>
        <button
          className={`py-3 px-6 font-medium text-center ${
            activeTab === 'settings'
              ? 'border-b-2 border-primary-600 text-primary-700'
              : 'text-secondary-600 hover:text-primary-600'
          }`}
          onClick={() => setActiveTab('settings')}
          data-testid="settings-tab"
        >
          Settings
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'profile' && (
          <div data-testid="profile-content">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>

            <div className="max-w-md">
              <Input label="Name" value={user.name || ''} readOnly data-testid="profile-name" />

              <Input label="Email" type="text" value={user.email || ''} readOnly data-testid="profile-email" />

              <div className="mt-6">
                <Button data-testid="edit-profile-button">Edit Profile</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div data-testid="orders-content">
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>

            {user.orders && user.orders.length > 0 ? (
              <div className="space-y-4">
                {user.orders.map(order => (
                  <div key={order.id} className="border border-secondary-200 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="font-medium">Order #{order.id}</span>
                        <span className="text-secondary-600 ml-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="capitalize font-medium">
                        Status: <span className="text-primary-600">{order.status}</span>
                      </div>
                    </div>

                    <div className="border-t border-secondary-200 pt-2 mt-2">
                      <h3 className="font-medium mb-2">Items:</h3>
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>
                              {item.title} x{item.quantity}
                            </span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between mt-2 pt-2 border-t border-secondary-200">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold">${order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary-600">You haven't placed any orders yet.</p>
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div data-testid="addresses-content">
            <h2 className="text-xl font-semibold mb-4">My Addresses</h2>

            {addresses.length > 0 ? (
              <div className="space-y-4 mb-6">
                {addresses.map(address => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 ${
                      address.isDefault ? 'border-primary-500 bg-primary-50' : 'border-secondary-200'
                    }`}
                    data-testid={`address-${address.id}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-secondary-700">
                          {address.name}
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-primary-500 text-white px-2 py-1 rounded">Default</span>
                          )}
                        </h3>
                      </div>
                      <div className="flex space-x-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-xs text-primary-600 hover:text-primary-700"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-secondary-600">
                      {address.street}
                      <br />
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary-600 mb-4">
                You haven't saved any addresses yet. Add a new address for faster checkout.
              </p>
            )}

            {!showAddressForm ? (
              <Button onClick={() => setShowAddressForm(true)} data-testid="add-address-button">
                Add New Address
              </Button>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 border border-secondary-200">
                <h3 className="font-semibold text-secondary-700 mb-4">Add New Address</h3>
                <form onSubmit={handleAddAddress} className="space-y-4">
                  <Input
                    label="Address Name (e.g., Home, Work)"
                    name="name"
                    value={newAddress.name}
                    onChange={handleAddressInputChange}
                    placeholder="Home"
                    required
                    data-testid="address-name-input"
                  />
                  <Input
                    label="Street Address"
                    name="street"
                    value={newAddress.street}
                    onChange={handleAddressInputChange}
                    placeholder="123 Main St"
                    required
                    data-testid="address-street-input"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressInputChange}
                      placeholder="New York"
                      required
                      data-testid="address-city-input"
                    />
                    <Input
                      label="State"
                      name="state"
                      value={newAddress.state}
                      onChange={handleAddressInputChange}
                      placeholder="NY"
                      required
                      data-testid="address-state-input"
                    />
                  </div>
                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    value={newAddress.zipCode}
                    onChange={handleAddressInputChange}
                    placeholder="10001"
                    required
                    data-testid="address-zipcode-input"
                  />
                  <div className="flex space-x-3">
                    <Button type="submit" data-testid="save-address-button">
                      Save Address
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setShowAddressForm(false);
                        setNewAddress({
                          name: '',
                          street: '',
                          city: '',
                          state: '',
                          zipCode: '',
                        });
                      }}
                      className="bg-gray-500 hover:bg-gray-600"
                      data-testid="cancel-address-button"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div data-testid="settings-content">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

            <div className="max-w-md">
              <div className="mb-6">
                <h3 className="font-medium mb-2">Change Password</h3>

                {passwordError && (
                  <div
                    className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
                    data-testid="password-error"
                  >
                    {passwordError}
                  </div>
                )}

                {passwordSuccess && (
                  <div
                    className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded"
                    data-testid="password-success"
                  >
                    {passwordSuccess}
                  </div>
                )}

                <form onSubmit={handleChangePassword}>
                  <Input
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your current password"
                    data-testid="current-password-input"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your new password"
                    data-testid="new-password-input"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm your new password"
                    data-testid="confirm-password-input"
                  />

                  <div className="mt-4">
                    <Button type="submit" data-testid="change-password-button">
                      Change Password
                    </Button>
                  </div>
                </form>
              </div>

              <div className="mt-8 pt-6 border-t border-secondary-200">
                <h3 className="font-medium mb-2">Email Preferences</h3>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                      defaultChecked
                      data-testid="newsletter-checkbox"
                    />
                    <label htmlFor="newsletter" className="ml-2 block text-secondary-700">
                      Subscribe to newsletter
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="order-updates"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                      defaultChecked
                      data-testid="order-updates-checkbox"
                    />
                    <label htmlFor="order-updates" className="ml-2 block text-secondary-700">
                      Order updates
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="promotional"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                      data-testid="promotional-checkbox"
                    />
                    <label htmlFor="promotional" className="ml-2 block text-secondary-700">
                      Promotional emails
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <Button data-testid="save-preferences-button">Save Preferences</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
