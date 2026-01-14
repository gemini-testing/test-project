import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-700 text-white pt-12 pb-8" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">About BookStore</h3>
            <p className="text-gray-300 mb-4">
              BookStore is your one-stop destination for books across all genres. We believe in the power of reading and
              aim to make books accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-300"
                aria-label="Facebook"
                data-testid="facebook-link"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-300"
                aria-label="Twitter"
                data-testid="twitter-link"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-300"
                aria-label="Instagram"
                data-testid="instagram-link"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-300"
                aria-label="YouTube"
                data-testid="youtube-link"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/books/bestsellers"
                  className="text-gray-300 hover:text-primary-300"
                  data-testid="bestsellers-link"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  to="/books/new-releases"
                  className="text-gray-300 hover:text-primary-300"
                  data-testid="new-releases-link"
                >
                  New Releases
                </Link>
              </li>
              <li>
                <Link
                  to="/books/awards"
                  className="text-gray-300 hover:text-primary-300"
                  data-testid="award-winners-link"
                >
                  Award Winners
                </Link>
              </li>
              <li>
                <Link
                  to="/books/sale"
                  className="text-gray-300 hover:text-primary-300"
                  data-testid="books-on-sale-link"
                >
                  Books on Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-primary-300" data-testid="help-center-link">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/orders/track"
                  className="text-gray-300 hover:text-primary-300"
                  data-testid="order-tracking-link"
                >
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-primary-300" data-testid="shipping-info-link">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-primary-300" data-testid="returns-link">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to receive updates on new books, special offers, and more.
            </p>
            <form className="flex">
              <input
                type="text"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l bg-white text-secondary-800 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                data-testid="newsletter-input"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-primary-500 to-accent-500 hover:opacity-90 text-white px-6 py-2 rounded-r font-medium transition-opacity"
                data-testid="newsletter-button"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-600 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0" data-testid="copyright">
            &copy; {currentYear} BookStore. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-primary-300" data-testid="privacy-policy-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-primary-300" data-testid="terms-link">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="text-gray-400 hover:text-primary-300" data-testid="accessibility-link">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
