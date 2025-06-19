import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ContestHistory from './ContestHistory';
import ProblemSolvingData from './ProblemSolvingData';
import SyncSettings from './SyncSettings';
import { fetchStudentProfile } from '../services/api';
import { ThemeContext } from '../context/ThemeContext';

const StudentProfile = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('contest');
    const [contestFilter, setContestFilter] = useState('30');
    const [problemFilter, setProblemFilter] = useState('7');
    const { darkMode } = useContext(ThemeContext);
    

    useEffect(() => {
        const loadStudentProfile = async () => {
            try {
                const data = await fetchStudentProfile(id);
                setStudent(data);
                setLoading(false);
            } catch (error) {
                console.error('Error loading student profile:', error);
                setLoading(false);
            }
        };
        loadStudentProfile();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className={`text-center text-2xl py-8 ${darkMode ? "text-gray-300" :"text-gray-600"}`}>
                Student Codeforces Account not found
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{student.name}</h1>
                        <div className="flex items-center mt-2 space-x-4">
                            <a
                                href={`mailto:${student.email}`}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {student.email}
                            </a>
                            <a
                                href={`tel:${student.phone}`}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {student.phone}
                            </a>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <a
                            href={`https://codeforces.com/profile/${student.cfHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <span className="mr-2">View on Codeforces</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Current Rating</h3>
                        <p className={`mt-1 text-2xl font-semibold ${student.currentRating >= 2400 ? 'text-red-600 dark:text-red-400' :
                                student.currentRating >= 2100 ? 'text-red-600 dark:text-red-400' :
                                    student.currentRating >= 1900 ? 'text-purple-600 dark:text-purple-400' :
                                        student.currentRating >= 1600 ? 'text-blue-600 dark:text-blue-400' :
                                            student.currentRating >= 1400 ? 'text-teal-600 dark:text-teal-400' :
                                                student.currentRating >= 1200 ? 'text-green-600 dark:text-green-400' :
                                                    'text-gray-600 dark:text-gray-300'
                            }`}>
                            {student.currentRating || 'N/A'}
                        </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Max Rating</h3>
                        <p className={`mt-1 text-2xl font-semibold ${student.maxRating >= 2400 ? 'text-red-600 dark:text-red-400' :
                                student.maxRating >= 2100 ? 'text-red-600 dark:text-red-400' :
                                    student.maxRating >= 1900 ? 'text-purple-600 dark:text-purple-400' :
                                        student.maxRating >= 1600 ? 'text-blue-600 dark:text-blue-400' :
                                            student.maxRating >= 1400 ? 'text-teal-600 dark:text-teal-400' :
                                                student.maxRating >= 1200 ? 'text-green-600 dark:text-green-400' :
                                                    'text-gray-600 dark:text-gray-300'
                            }`}>
                            {student.maxRating || 'N/A'}
                        </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Last Updated</h3>
                        <p className="mt-1 text-xl text-gray-800 dark:text-gray-200">
                            {student.lastUpdated ? new Date(student.lastUpdated).toLocaleString() : 'Never'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('contest')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'contest'
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            Contest History
                        </button>
                        <button
                            onClick={() => setActiveTab('problems')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'problems'
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            Problem Solving
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'settings'
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            Sync Settings
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'contest' && (
                        <ContestHistory
                            studentId={student.id}
                            filter={contestFilter}
                            onFilterChange={setContestFilter}
                        />
                    )}
                    {activeTab === 'problems' && (
                        <ProblemSolvingData
                            studentId={student.id}
                            filter={problemFilter}
                            onFilterChange={setProblemFilter}
                        />
                    )}
                    {activeTab === 'settings' && (
                        <SyncSettings student={student} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;