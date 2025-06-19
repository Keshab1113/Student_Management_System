import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import AddStudentModal from './AddStudentModal';
import EditStudentModal from './EditStudentModal';
import ConfirmationModal from './ConfirmationModal';
import { ThemeContext } from '../context/ThemeContext';
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaSyncAlt } from "react-icons/fa";
import { deleteStudent } from '../services/api';

const StudentTable = ({ students, loading, onSyncStudent }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [allStudents, setStudents] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const { darkMode } = useContext(ThemeContext);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.codeforcesHandle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setShowEditModal(true);
    };

    const handleDelete = (student) => {
        setSelectedStudent(student);
        setShowDeleteModal(true);
    };

    const handleSync = (student) => {
        // onSyncStudent(student.id, student.codeforcesHandle);
    };

    const csvData = [
        ['Name', 'Email', 'Phone', 'Codeforces Handle', 'Current Rating', 'Max Rating', 'Last Updated'],
        ...students.map(student => [
            student.name,
            student.email,
            student.phoneNumber,
            student.codeforcesHandle,
            student.currentRating || 'N/A',
            student.maxRating || 'N/A',
            student.updatedAt ? new Date(student.updatedAt).toLocaleString() : 'Never'
        ])
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    

    return (
        <div className="overflow-x-auto">
            <div className="flex md:flex-row flex-col-reverse justify-between md:items-center items-start mb-6 gap-10">
                <h2 className={`text-2xl font-bold ${darkMode ? "text-white" :"text-gray-800"}`}>Student List</h2>
                <div className="flex md:flex-row flex-col-reverse md:space-x-4 gap-4  w-full md:w-fit">
                    <input
                        type="text"
                        placeholder="Search students..."
                        className={`px-4 py-2 border rounded-lg outline-none dark:border-gray-600  ${darkMode ?"bg-gray-700 text-white":" bg-white text-black"}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        Add Student
                    </button>
                    <CSVLink
                        data={csvData}
                        filename="students_data.csv"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
                    >
                        Export CSV
                    </CSVLink>
                </div>
            </div>

            <div className="shadow-lg rounded-lg overflow-scroll overflow-y-hidden lg:overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={`${!darkMode ? 'bg-gray-100 text-black' : 'bg-gray-700 text-white'}`}>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">CF Handle</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Max Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Updated</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${!darkMode ? 'bg-white' : 'bg-gray-800'}`}>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/student/${student._id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                            {student.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">{student.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">{student.phoneNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a
                                            href={`https://codeforces.com/profile/${student.codeforcesHandle}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            {student.codeforcesHandle}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.currentRating >= 2400 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                                                student.currentRating >= 2100 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                                                    student.currentRating >= 1900 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' :
                                                        student.currentRating >= 1600 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                                                            student.currentRating >= 1400 ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100' :
                                                                student.currentRating >= 1200 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                                                                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {student.currentRating || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.maxRating >= 2400 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                                                student.maxRating >= 2100 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                                                    student.maxRating >= 1900 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' :
                                                        student.maxRating >= 1600 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                                                            student.maxRating >= 1400 ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100' :
                                                                student.maxRating >= 1200 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                                                                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {student.maxRating || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                                        {student.updatedAt ? new Date(student.updatedAt).toLocaleString() : 'Never'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2 md:justify-around">
                                            <button
                                                onClick={() => handleEdit(student)}
                                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300  cursor-pointer text-xl"
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student)}
                                                className="text-red-600 cursor-pointer text-xl dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                            >
                                                <MdOutlineDeleteOutline />
                                            </button>
                                            <button
                                                onClick={() => handleSync(student)}
                                                className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 cursor-pointer text-xl "
                                                title="Sync CF Data"
                                            >
                                                <FaSyncAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AddStudentModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onStudentAdded={(newStudent) => setStudents([...students, newStudent])}
            />

            {selectedStudent && (
                <>
                    <EditStudentModal
                        isOpen={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        student={selectedStudent}
                        onStudentUpdated={(updatedStudent) => {
                            setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
                        }}
                    />
                    <ConfirmationModal
                        isOpen={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={async () => {
                            try {
                                await deleteStudent(selectedStudent._id);
                                alert("Student Deleted");
                                setStudents(prev => prev.filter(s => s._id !== selectedStudent._id));
                            } catch (err) {
                                console.error('Failed to delete:', err.message);
                                alert('Delete failed');
                            }
                        }}
                        title="Delete Student"
                        message={`Are you sure you want to delete ${selectedStudent.name}?`}
                    />
                </>
            )}
        </div>
    );
};

export default StudentTable;