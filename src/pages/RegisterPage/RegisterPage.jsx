import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden" data-testid="register-page">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
        
        <RegisterForm />
        
        <div className="mt-6 text-center">
          <p className="text-secondary-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary-600 hover:text-primary-800 font-medium"
              data-testid="login-link"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
