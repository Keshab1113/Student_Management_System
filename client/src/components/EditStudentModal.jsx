import React, { useState, useEffect, useContext } from 'react';
import { updateStudent } from '../services/api';
import { ThemeContext } from '../context/ThemeContext';

const EditStudentModal = ({ isOpen, onClose, student, onStudentUpdated }) => {
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

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name || '',
                email: student.email || '',
                phoneNumber: student.phoneNumber || '',
                codeforcesHandle: student.codeforcesHandle || '',
                currentRating: student.currentRating || '',
                maxRating: student.maxRating || '',
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const updatedStudent = await updateStudent(student._id, formData);
            onStudentUpdated(updatedStudent);
            onClose();
            alert("Student Updated Successfully.")
        } catch (err) {
            setError(err.message || 'Failed to update student');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !student) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-[1px] border shadow-lg rounded-xl ${darkMode ? 'bg-black/30 border-white/20' : 'bg-white/30 border-black/10'
            }`}>
            <div className={`rounded-lg shadow-xl w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-6">
                    <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Edit Student
                    </h2>

                    {error && (
                        <div className={`mb-4 p-2 rounded ${darkMode ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-700'}`}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {[
                                { name: 'name', label: 'Name', type: 'text' },
                                { name: 'email', label: 'Email', type: 'email' },
                                { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
                                { name: 'codeforcesHandle', label: 'Codeforces Handle', type: 'text' },
                                { name: 'currentRating', label: 'Current Rating', type: 'number' },
                                { name: 'maxRating', label: 'Max Rating', type: 'number' },
                            ].map(({ name, label, type }) => (
                                <div key={name}>
                                    <label htmlFor={name} className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        id={name}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        required={name !== 'phoneNumber'}
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
                                {isSubmitting ? 'Updating...' : 'Update Student'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditStudentModal;
