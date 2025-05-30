import React, { useContext } from 'react';
import { AppContext } from '../App'; // Import AppContext

const ErrorMessage = () => {
  const { errorMessage, setErrorMessage } = useContext(AppContext);
  if (!errorMessage) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-3 text-center z-50 rounded-b-lg shadow-lg">
      {errorMessage}
      <button
        onClick={() => setErrorMessage('')}
        className="ml-4 text-sm font-bold"
      >
        &times;
      </button>
    </div>
  );
};

export default ErrorMessage;