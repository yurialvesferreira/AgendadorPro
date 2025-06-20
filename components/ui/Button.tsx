
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-150 ease-in-out inline-flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-400',
    secondary: 'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    neutral: 'bg-slate-600 hover:bg-slate-500 text-slate-100 focus:ring-slate-400',
    disabled: 'bg-slate-500 text-slate-400 cursor-not-allowed',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[props.disabled ? 'disabled' : variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
