
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-slate-800 shadow-xl rounded-lg p-6 md:p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
