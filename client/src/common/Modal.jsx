import React from 'react';

const Modal = ({ message, username, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <p className="text-xl font-semibold mb-4">{message}</p>
        <p className="mb-6">Użytkownik: {username}</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-800 hover:text-white transition-smooth"
          >
            Nie
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-800 transition-smooth"
          >
            Tak, usuń
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
