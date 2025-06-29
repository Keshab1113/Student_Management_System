import React, { useContext, useState } from 'react';
import { addStudent } from '../services/api';
import { ThemeContext } from '../context/ThemeContext';

const AddStudentModal = ({ isOpen, onClose, onStudentAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        codeforcesHandle: '',
        currentRating: '',
        maxRating: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const { darkMode } = useContext(ThemeContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const newStudent = await addStudent(formData);
            onStudentAdded(newStudent);
            alert("Student Added Successfully.")
            onClose();
            setFormData({ name: '', email: '', phoneNumber: '', codeforcesHandle: '' });
        } catch (err) {
            setError(err.message || 'Failed to add student');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-[1px] border shadow-lg rounded-xl ${darkMode ? 'bg-black/30 border-white/20' : 'bg-white/30 border-black/10'
                }`}
        >
            <div className={`rounded-lg shadow-xl w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-6">
                    <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Add New Student
                    </h2>

                    {error && (
                        <div
                            className={`mb-4 p-2 rounded ${darkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {['name', 'email', 'phoneNumber', 'codeforcesHandle', 'currentRating', 'maxRating'].map((field) => (
                                <div key={field}>
                                    <label
                                        htmlFor={field}
                                        className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}
                                    >
                                        {field === 'codeforcesHandle' ? 'Codeforces Handle' : field.charAt(0).toUpperCase() + field.slice(1).replace('codeforcesHandle', 'Codeforces Handle')}
                                    </label>
                                    <input
                                        type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                                        id={field}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required={field !== 'phoneNumber'}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode
                                                ? 'bg-gray-700 text-white border-gray-600'
                                                : 'bg-white text-gray-900 border-gray-300'
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-blue-500 ${darkMode
                                        ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
                            >
                                {isSubmitting ? 'Adding...' : 'Add Student'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudentModal;
