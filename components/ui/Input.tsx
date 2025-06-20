
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  // Note: HTMLTextAreaElement is handled by a separate TextArea component if needed.
  // This Input is primarily for <input> elements.
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', type="text", ...props }) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-300 mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-md p-2.5 
                    focus:ring-teal-500 focus:border-teal-500 transition-colors
                    disabled:bg-slate-600 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    </div>
  );
};
