
import React from 'react';

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message, className = '' }) => {
  const baseStyles = 'p-4 rounded-md text-sm';
  const typeStyles = {
    info: 'bg-sky-700/50 text-sky-100 border border-sky-500/60',
    success: 'bg-green-700/50 text-green-100 border border-green-500/60',
    warning: 'bg-yellow-700/50 text-yellow-100 border border-yellow-500/60',
    error: 'bg-red-700/50 text-red-100 border border-red-500/60',
  };

  return (
    <div role="alert" className={`${baseStyles} ${typeStyles[type]} ${className}`}>
      {message}
    </div>
  );
};
