import React, { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({
  label,
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  error,
  className = '',
  labelClassName = '',
  inputClassName = '',
  ...props
}, ref) => {
  // Generate an ID if not provided
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={clsx('mb-4', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            'block text-sm font-medium text-secondary-700 mb-1',
            labelClassName
          )}
          data-testid={`${inputId}-label`}
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={clsx(
          'w-full rounded-tp shadow-sm border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-300 focus:ring-opacity-50',
          error && 'border-danger focus:border-danger focus:ring-danger',
          disabled && 'bg-gray-100 cursor-not-allowed',
          inputClassName
        )}
        required={required}
        data-testid={props['data-testid'] || inputId}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-danger" data-testid={`${inputId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
