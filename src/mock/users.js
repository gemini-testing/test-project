export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'user@example.com', // Simple email for testing
    password: 'password123', // Simple password for testing
    orders: [
      {
        id: 1001,
        items: [
          { id: 1, title: 'The Great Gatsby', price: 12.99, quantity: 1 },
          { id: 2, title: 'To Kill a Mockingbird', price: 14.99, quantity: 2 },
        ],
        totalAmount: 42.97,
        status: 'delivered',
        createdAt: '2023-07-15T10:30:00Z',
      },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'pass123',
    orders: [],
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    password: 'robert456',
    orders: [
      {
        id: 1002,
        items: [{ id: 3, title: '1984', price: 11.99, quantity: 1 }],
        totalAmount: 11.99,
        status: 'processing',
        createdAt: '2023-08-01T14:20:00Z',
      },
    ],
  },
  {
    id: 4,
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword',
    orders: [],
  },
];

export const getUserByEmail = email => {
  return users.find(user => user.email === email);
};

export const getUserById = id => {
  return users.find(user => user.id === id);
};
