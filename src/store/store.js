import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    books: bookReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем определенные пути в проверке на сериализуемость
        ignoredActions: ['auth/login/fulfilled', 'auth/register/fulfilled'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

export default store;
