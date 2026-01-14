import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import BookCard from './BookCard';

// Mock store for Storybook
const mockStore = configureStore({
  reducer: {
    cart: (state = { items: [] }, action) => {
      switch (action.type) {
        case 'cart/addToCart':
          console.log('Added to cart:', action.payload);
          return state;
        default:
          return state;
      }
    },
  },
});

// Decorator to wrap stories with Redux Provider and Router
const withProviders = Story => (
  <Provider store={mockStore}>
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  </Provider>
);

export default {
  title: 'Books/BookCard',
  component: BookCard,
  decorators: [withProviders],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    book: {
      control: 'object',
    },
  },
};

const sampleBook = {
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  cover: 'https://dummyimage.com/300x450/4287f5/ffffff&text=The+Great+Gatsby',
  price: 12.99,
  rating: 4.5,
};

export const Default = {
  args: {
    book: sampleBook,
  },
};

export const HighRating = {
  args: {
    book: {
      ...sampleBook,
      id: 2,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      rating: 4.9,
      price: 133.99,
    },
  },
};

export const LowPrice = {
  args: {
    book: {
      ...sampleBook,
      id: 3,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 9.99,
      rating: 4.6,
    },
  },
};
