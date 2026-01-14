import React from 'react';
import clsx from 'clsx';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';

  const variantClasses = {
    primary: disabled
      ? 'bg-gradient-to-r from-primary-300 to-accent-300 text-white shadow-md cursor-not-allowed'
      : 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 hover:shadow-lg hover:scale-105 active:scale-100 text-white shadow-md focus:ring-primary-500',
    secondary: disabled
      ? 'bg-secondary-300 text-white shadow-md cursor-not-allowed'
      : 'bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-white shadow-md focus:ring-secondary-500',
    outlined: disabled
      ? 'bg-transparent border-2 border-gray-300 text-gray-400 cursor-not-allowed'
      : 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',
    danger: disabled
      ? 'bg-red-300 text-white shadow-md cursor-not-allowed'
      : 'bg-danger hover:bg-red-600 active:bg-red-700 text-white shadow-md focus:ring-red-500',
    success: disabled
      ? 'bg-green-300 text-white shadow-md cursor-not-allowed'
      : 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-md focus:ring-green-500',
    text: disabled
      ? 'bg-transparent text-gray-400 cursor-not-allowed'
      : 'bg-transparent hover:text-primary-600 hover:underline active:text-primary-700',
  };

  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5',
    xl: 'text-lg py-3 px-6',
  };

  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    !disabled && 'cursor-pointer',
    className
  );

  return (
    <button type={type} className={buttonClasses} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
