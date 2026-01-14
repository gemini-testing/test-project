import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

const OrdersPage = () => {
  const { user } = useSelector(state => state.auth);

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Mock orders data
  const orders = [
    {
      id: 'ORD-2024-001',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'delivered',
      totalAmount: 89.97,
      items: [
        { id: 1, title: 'The Great Gatsby', quantity: 1, price: 29.99 },
        { id: 2, title: 'To Kill a Mockingbird', quantity: 2, price: 29.99 },
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      },
    },
    {
      id: 'ORD-2024-002',
      createdAt: '2024-01-20T14:15:00Z',
      status: 'shipped',
      totalAmount: 119.96,
      items: [
        { id: 3, title: '1984', quantity: 2, price: 24.99 },
        { id: 4, title: 'Pride and Prejudice', quantity: 2, price: 34.99 },
      ],
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
      },
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-2024-003',
      createdAt: '2024-01-25T09:00:00Z',
      status: 'processing',
      totalAmount: 64.98,
      items: [
        { id: 5, title: 'The Catcher in the Rye', quantity: 1, price: 27.99 },
        { id: 6, title: 'Brave New World', quantity: 1, price: 36.99 },
      ],
      shippingAddress: {
        street: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
      },
    },
  ];

  const getStatusColor = status => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = status => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6" data-testid="orders-page">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-secondary-700">My Orders</h1>
        <p className="text-secondary-600 mt-2">Track and manage all your orders in one place</p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              data-testid={`order-${order.id}`}
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-secondary-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-secondary-500">Order Number</p>
                      <p className="font-bold text-secondary-700">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-500">Order Date</p>
                      <p className="font-medium text-secondary-700">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-500">Total</p>
                      <p className="font-bold text-primary-600">${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-6 py-4">
                <h3 className="font-semibold text-secondary-700 mb-3">Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-b border-secondary-100 last:border-b-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-secondary-700">{item.title}</p>
                        <p className="text-sm text-secondary-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-secondary-700">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="px-6 py-4 bg-gray-50 border-t border-secondary-200">
                <h3 className="font-semibold text-secondary-700 mb-2">Shipping Address</h3>
                <p className="text-sm text-secondary-600">
                  {order.shippingAddress.street}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                {order.trackingNumber && (
                  <div className="mt-3">
                    <p className="text-sm text-secondary-700">
                      <span className="font-medium">Tracking Number:</span>{' '}
                      <span className="text-primary-600 font-mono">{order.trackingNumber}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Order Actions */}
              <div className="px-6 py-4 bg-white border-t border-secondary-200">
                <div className="flex space-x-3">
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    View Details
                  </Link>
                  {order.status === 'delivered' && (
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      Leave Review
                    </button>
                  )}
                  {order.status === 'processing' && (
                    <button className="text-red-600 hover:text-red-700 font-medium text-sm">Cancel Order</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-xl font-semibold text-secondary-700 mb-2">No orders yet</h2>
          <p className="text-secondary-600 mb-6">Start shopping and your orders will appear here</p>
          <Link
            to="/"
            className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
