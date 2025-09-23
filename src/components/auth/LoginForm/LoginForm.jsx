// src/components/auth/LoginForm/LoginForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../../../store/slices/authSlice';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
}).required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setLoginError('');
      setIsLoading(true);
      
      console.log('Login form submitted with data:', data); // Для отладки
      
      const resultAction = await dispatch(login(data));
      // Проверяем, был ли запрос успешным
      if (login.fulfilled.match(resultAction)) {
        // Перенаправляем на главную страницу после успешного входа
        navigate('/');
      } else if (login.rejected.match(resultAction)) {
        // Если запрос отклонен, получаем ошибку из payload
        setLoginError(resultAction.payload || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="login-form">
      {loginError && (
        <div className="p-3 bg-red-100 text-danger rounded" data-testid="login-error">
          {loginError}
        </div>
      )}
      
      <div>
        <Input
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
          error={errors.email?.message}
          data-testid="email-input"
        />
      </div>
      
      <div>
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          {...register("password")}
          error={errors.password?.message}
          data-testid="password-input"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary-600 border-gray-300 rounded"
            data-testid="remember-checkbox"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
            Remember me
          </label>
        </div>
        
        <div className="text-sm">
          <a href="#" className="text-primary-600 hover:text-primary-500" data-testid="forgot-password-link">
            Forgot your password?
          </a>
        </div>
      </div>
      
      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          data-testid="login-button"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
