import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { fetchContestHistory } from '../services/api';
import { ThemeContext } from '../context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ContestHistory = ({ studentId, filter, onFilterChange }) => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        const loadContestHistory = async () => {
            try {
                const data = await fetchContestHistory(studentId, filter);
                setContests(data);
                setLoading(false);
            } catch (error) {
                console.error('Error loading contest history:', error);
                setLoading(false);
            }
        };
        loadContestHistory();
    }, [studentId, filter]);

    const chartData = {
        labels: contests.map(c => c.contestName),
        datasets: [
            {
                label: 'Rating',
                data: contests.map(c => c.newRating),
                borderColor: darkMode ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)',
                backgroundColor: darkMode ? 'rgba(96, 165, 250, 0.5)' : 'rgba(59, 130, 246, 0.5)',
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: darkMode ? '#F3F4F6' : '#111827',
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: darkMode ? '#9CA3AF' : '#6B7280',
                },
                grid: {
                    color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
            },
            y: {
                ticks: {
                    color: darkMode ? '#9CA3AF' : '#6B7280',
                },
                grid: {
                    color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
            },
        },
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>Contest History</h2>
                <div className="flex space-x-2">
                    {['30', '90', '365'].map((value) => (
                        <button
                            key={value}
                            onClick={() => onFilterChange(value)}
                            className={`px-3 py-1 rounded-md text-sm ${filter === value
                                    ? 'bg-blue-600 text-white'
                                    : darkMode
                                        ? 'bg-gray-700 text-gray-300'
                                        : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            {value === '30' ? 'Last 30 Days' : value === '90' ? 'Last 90 Days' : 'Last Year'}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="h-64">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white' : 'text-white'}`}>Contest</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white' : 'text-white'}`}>Rank</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white' : 'text-white'}`}>Solved</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white' : 'text-white'}`}>Rating Change</th>
                            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white' : 'text-white'}`}>Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {contests.length > 0 ? (
                            contests.map((contest) => (
                                <tr key={contest.contestId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a
                                            href={`https://codeforces.com/contest/${contest.contestId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            {contest.contestName}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{contest.rank}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {contest.solvedCount} / {contest.totalProblems}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${contest.ratingChange >= 0
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                                }`}
                                        >
                                            {contest.ratingChange >= 0 ? '+' : ''}
                                            {contest.ratingChange}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {new Date(contest.contestTime * 1000).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                                    No contests found in the selected period
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContestHistory;
