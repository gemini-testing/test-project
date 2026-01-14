import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import BookDetailPage from './pages/BookDetailPage/BookDetailPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage/CheckoutSuccessPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import AuthorPage from './pages/AuthorPage/AuthorPage';
import SpecialOffersPage from './pages/SpecialOffersPage/SpecialOffersPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="index.html" element={<HomePage />} />
            <Route path="books/:id" element={<BookDetailPage />} />
            <Route path="books/category/:genre" element={<CategoryPage />} />
            <Route path="author/:authorSlug" element={<AuthorPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="checkout/success" element={<CheckoutSuccessPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="special-offers" element={<SpecialOffersPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
