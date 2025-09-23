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
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-tp focus:outline-none transition-colors duration-200';
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-tp',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-tp',
    outlined: 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50',
    danger: 'bg-danger hover:bg-danger text-white shadow-tp',
    success: 'bg-success hover:bg-success text-white shadow-tp',
    text: 'bg-transparent hover:text-primary-500 hover:underline',
  };
  
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5',
    xl: 'text-lg py-3 px-6',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className
  );
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
