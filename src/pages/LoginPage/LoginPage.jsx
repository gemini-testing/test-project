import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-tp shadow-tp overflow-hidden" data-testid="login-page">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-secondary-700">Sign In</h1>
        
        <LoginForm />
        
        <div className="mt-6 text-center">
          <p className="text-secondary-500">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-primary-600 hover:text-primary-700 font-medium"
              data-testid="register-link"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
