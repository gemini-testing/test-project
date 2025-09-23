// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';

const Layout = () => {
  const location = useLocation();
  
  // Список страниц, где сайдбар НЕ должен отображаться
  const pagesWithoutSidebar = [
    '/login',
    '/register',
    '/checkout',
    '/checkout/success'
  ];
  
  // Проверяем, должен ли отображаться сайдбар на текущей странице
  const shouldShowSidebar = !pagesWithoutSidebar.includes(location.pathname);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {shouldShowSidebar ? (
            <div className="flex flex-col md:flex-row gap-8">
              <Sidebar className="w-full md:w-64" />
              <div className="flex-grow">
                <Outlet />
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
