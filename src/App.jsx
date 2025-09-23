// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import BookDetailPage from './pages/BookDetailPage/BookDetailPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage/CheckoutSuccessPage'; // Новый импорт
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import AuthorPage from './pages/AuthorPage/AuthorPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="books/:id" element={<BookDetailPage />} />
            <Route path="books/category/:genre" element={<CategoryPage />} />
            <Route path="author/:authorSlug" element={<AuthorPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="checkout/success" element={<CheckoutSuccessPage />} /> {/* Новый маршрут */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
