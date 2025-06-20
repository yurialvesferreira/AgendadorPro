
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Tailwind color class e.g. text-teal-500
  message?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'text-teal-400', 
  message,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-[6px]',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-solid border-current border-r-transparent ${sizeClasses[size]} ${color}`} 
        role="status"
        aria-live="polite"
        aria-label={message || "Loading..."}
      >
        <span className="sr-only">{message || "Carregando..."}</span>
      </div>
      {message && <p className={`mt-2 text-sm ${color}`}>{message}</p>}
    </div>
  );
};
