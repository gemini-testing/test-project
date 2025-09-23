// src/components/auth/RegisterForm/RegisterForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { register as registerUser } from '../../../store/slices/authSlice';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
}).required();

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    if (!termsAccepted) {
      setRegisterError('You must accept the Terms of Service and Privacy Policy');
      return;
    }
    
    try {
      setRegisterError('');
      setIsLoading(true);
      
      const resultAction = await dispatch(registerUser(data));
      
      if (registerUser.fulfilled.match(resultAction)) {
        navigate('/');
      } else if (registerUser.rejected.match(resultAction)) {
        setRegisterError(resultAction.payload || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setRegisterError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="register-form">
      {registerError && (
        <div className="p-3 bg-red-100 text-danger rounded" data-testid="register-error">
          {registerError}
        </div>
      )}
      
      <Input
        label="Name"
        placeholder="Your full name"
        {...register("name")}
        error={errors.name?.message}
        data-testid="name-input"
      />
      
      <Input
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        {...register("email")}
        error={errors.email?.message}
        data-testid="email-input"
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="Choose a password"
        {...register("password")}
        error={errors.password?.message}
        data-testid="password-input"
      />
      
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        data-testid="confirm-password-input"
      />
      
      <div className="flex items-center mb-4">
        <input
          id="terms"
          type="checkbox"
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          checked={termsAccepted}
          onChange={() => setTermsAccepted(prev => !prev)}
          data-testid="terms-checkbox"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-secondary-700">
          I agree to the{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">
            Privacy Policy
          </a>
        </label>
      </div>
      
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        data-testid="register-button"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;
