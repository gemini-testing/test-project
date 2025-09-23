import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const NotFoundPage = () => {
  return (
    <div className="text-center py-16" data-testid="not-found-page">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg text-secondary-600 mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button size="lg" data-testid="go-home-button">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
