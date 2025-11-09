import React from 'react';
import { ErrorMessageProps } from '../types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="bg-red-50 border border-red-300 text-red-600 px-5 py-4 rounded-lg relative mt-6"
      role="alert"
    >
      <strong className="font-semibold">خطا: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;