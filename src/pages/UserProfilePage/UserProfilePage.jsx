import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';

const UserProfilePage = () => {
  const { user } = useSelector(state => state.auth);
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const [activeTab, setActiveTab] = useState('profile');
  
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
              <Input
                label="Name"
                value={user.name || ''}
                readOnly
                data-testid="profile-name"
              />
              
              <Input
                label="Email"
                type="email"
                value={user.email || ''}
                readOnly
                data-testid="profile-email"
              />
              
              <div className="mt-6">
                <Button data-testid="edit-profile-button">
                  Edit Profile
                </Button>
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
                            <span className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
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
            
            <p className="text-secondary-600 mb-4">
              You haven't saved any addresses yet. Add a new address for faster checkout.
            </p>
            
            <Button data-testid="add-address-button">
              Add New Address
            </Button>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div data-testid="settings-content">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            
            <div className="max-w-md">
              <div className="mb-6">
                <h3 className="font-medium mb-2">Change Password</h3>
                <Input
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  placeholder="Enter your current password"
                  data-testid="current-password-input"
                />
                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  placeholder="Enter your new password"
                  data-testid="new-password-input"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  data-testid="confirm-password-input"
                />
                
                <div className="mt-4">
                  <Button data-testid="change-password-button">
                    Change Password
                  </Button>
                </div>
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
                  <Button data-testid="save-preferences-button">
                    Save Preferences
                  </Button>
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
