import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    const { darkMode } = useContext(ThemeContext);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm 
            ${darkMode ? 'bg-black/30' : 'bg-white/30'}`}
        >
            <div className={`rounded-lg shadow-xl w-full max-w-md border 
                ${darkMode ? 'bg-gray-800 border-white/20' : 'bg-white/30 border-black/10'}`}>
                <div className="p-6">
                    <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{message}</p>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none cursor-pointer 
                                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                                ${darkMode
                                    ? 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600'
                                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'}`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
