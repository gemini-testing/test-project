import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { logout } from '../../../store/slices/authSlice';
import { clearFilters } from '../../../store/slices/bookSlice';
import { clearCart } from '../../../store/slices/cartSlice';

const Header = () => {
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { totalItems } = useSelector(state => state.cart);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogoClick = e => {
    e.preventDefault();
    dispatch(clearFilters());
    setSearchQuery('');
    navigate('/');
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearFilters());
    setSearchQuery('');
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-white"
            data-testid="logo"
            onClick={handleLogoClick}
          >
            BookStore
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="relative" data-testid="search-form">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-64 py-2 px-4 pr-20 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                data-testid="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                  aria-label="Clear search"
                  data-testid="clear-search-button"
                >
                  <FaTimes />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                aria-label="Search"
                data-testid="search-button"
              >
                <FaSearch />
              </button>
            </form>

            {/* Navigation links */}
            <nav className="flex items-center space-x-6">
              <Link
                to="/books/category/fiction"
                className="text-white hover:text-white/80 transition-colors"
                data-testid="fiction-category"
              >
                Fiction
              </Link>
              <Link
                to="/books/category/non-fiction"
                className="text-white hover:text-white/80 transition-colors"
                data-testid="non-fiction-category"
              >
                Non-Fiction
              </Link>

              {/* Cart link with counter */}
              <Link
                to="/cart"
                className="relative text-white hover:text-white/80 transition-colors"
                data-testid="cart-icon"
              >
                <FaShoppingCart size={20} />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-accent-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg"
                    data-testid="cart-count"
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User menu */}
              {user ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    className="flex items-center text-white hover:text-white/80 transition-colors"
                    data-testid="user-menu-button"
                    onClick={toggleProfileMenu}
                  >
                    <FaUser size={18} className="mr-2" />
                    <span>{user.name || 'My Account'}</span>
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                      <Link
                        to="/profile"
                        className="block px-4 py-2.5 text-sm font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        data-testid="profile-link"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2.5 text-sm font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        data-testid="orders-link"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2.5 text-sm font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        data-testid="logout-button"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-white hover:text-white/80 transition-colors" data-testid="login-link">
                  Sign in
                </Link>
              )}
            </nav>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearchSubmit} className="relative mb-4" data-testid="mobile-search-form">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pr-20 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                data-testid="mobile-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                  aria-label="Clear search"
                  data-testid="mobile-clear-search-button"
                >
                  <FaTimes />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                data-testid="mobile-search-button"
              >
                <FaSearch />
              </button>
            </form>

            <nav className="flex flex-col space-y-4">
              <Link
                to="/books/category/fiction"
                className="text-white hover:text-white/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-fiction-category"
              >
                Fiction
              </Link>
              <Link
                to="/books/category/non-fiction"
                className="text-white hover:text-white/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-non-fiction-category"
              >
                Non-Fiction
              </Link>
              <Link
                to="/books/new-releases"
                className="text-white hover:text-white/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-new-releases"
              >
                New Releases
              </Link>
              <Link
                to="/cart"
                className="flex items-center text-white hover:text-white/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-cart-icon"
              >
                <FaShoppingCart size={18} className="mr-2" />
                <span>Cart ({totalItems})</span>
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-white hover:text-white/80 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    data-testid="mobile-profile-link"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="text-white hover:text-white/80 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    data-testid="mobile-orders-link"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-white hover:text-white/80 transition-colors text-left"
                    data-testid="mobile-logout-button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-white hover:text-primary-300"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid="mobile-login-link"
                >
                  Sign in
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
