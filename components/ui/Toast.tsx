
import React, { useEffect } from 'react';
import { useBooking } from '../../services/bookingService'; // Assuming addToast, removeToast, toasts are here
import { ToastMessage } from '../../types';

const Toast: React.FC<{ message: ToastMessage; onDismiss: (id: number) => void }> = ({ message, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(message.id);
    }, 5000); // Auto-dismiss after 5 seconds
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  const baseStyle = "max-w-xs w-full bg-slate-700 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden";
  const typeStyles = {
    success: "border-l-4 border-green-500",
    error: "border-l-4 border-red-500",
    info: "border-l-4 border-sky-500",
  };

  const iconType = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  }

  return (
    <div className={`${baseStyle} ${typeStyles[message.type]}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5 text-xl">
            {iconType[message.type]}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-slate-100">{message.message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => onDismiss(message.id)}
              className="inline-flex text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBooking();

  if (!toasts.length) return null;

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex flex-col items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-end z-50 space-y-4"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
};
