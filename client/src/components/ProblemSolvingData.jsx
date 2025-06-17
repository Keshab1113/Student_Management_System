import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { fetchProblemData } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProblemSolvingData = ({ studentId, filter, onFilterChange }) => {
    const [problemData, setProblemData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const { theme } = useTheme();
    const theme = 'light'

    useEffect(() => {
        const loadProblemData = async () => {
            try {
                const data = await fetchProblemData(studentId, filter);
                setProblemData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error loading problem data:', error);
                setLoading(false);
            }
        };
        loadProblemData();
    }, [studentId, filter]);

    const barData = {
        labels: problemData?.ratingDistribution.map(item => item.ratingRange),
        datasets: [
            {
                label: 'Problems Solved',
                data: problemData?.ratingDistribution.map(item => item.count),
                backgroundColor: theme === 'light' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(96, 165, 250, 0.7)',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: theme === 'light' ? '#111827' : '#F3F4F6',
                },
            },
            title: {
                display: true,
                text: 'Problems Solved by Rating',
                color: theme === 'light' ? '#111827' : '#F3F4F6',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: theme === 'light' ? '#6B7280' : '#9CA3AF',
                },
                grid: {
                    color: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                },
            },
            y: {
                ticks: {
                    color: theme === 'light' ? '#6B7280' : '#9CA3AF',
                },
                grid: {
                    color: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
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

    if (!problemData) {
        return (
            <div className="text-center py-8 text-gray-600 dark:text-gray-300">
                No problem solving data available
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Problem Solving Statistics</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onFilterChange('7')}
                        className={`px-3 py-1 rounded-md text-sm ${filter === '7'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Last 7 Days
                    </button>
                    <button
                        onClick={() => onFilterChange('30')}
                        className={`px-3 py-1 rounded-md text-sm ${filter === '30'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Last 30 Days
                    </button>
                    <button
                        onClick={() => onFilterChange('90')}
                        className={`px-3 py-1 rounded-md text-sm ${filter === '90'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Last 90 Days
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                            <p className="text-sm text-gray-600 dark:text-gray-300">Total Solved</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{problemData.totalSolved}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                            <p className="text-sm text-gray-600 dark:text-gray-300">Avg. Rating</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{problemData.averageRating.toFixed(1)}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                            <p className="text-sm text-gray-600 dark:text-gray-300">Problems/Day</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{problemData.averageProblemsPerDay.toFixed(1)}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                            <p className="text-sm text-gray-600 dark:text-gray-300">Hardest Solved</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{problemData.hardestProblem.rating}</p>
                            <a
                                href={`https://codeforces.com/problemset/problem/${problemData.hardestProblem.contestId}/${problemData.hardestProblem.index}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {problemData.hardestProblem.name}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="h-64">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Submission Heatmap</h3>
                <div className="overflow-x-auto">
                    <CalendarHeatmap
                        startDate={new Date(Date.now() - parseInt(filter) * 24 * 60 * 60 * 1000)}
                        endDate={new Date()}
                        values={problemData.submissionCalendar}
                        classForValue={(value) => {
                            if (!value) {
                                return 'color-empty';
                            }
                            return `color-scale-${Math.min(4, Math.floor(value.count / 5))}`;
                        }}
                        tooltipDataAttrs={(value) => {
                            if (!value || !value.date) {
                                return null;
                            }
                            return {
                                'data-tooltip': `${value.date}: ${value.count} problems solved`,
                            };
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProblemSolvingData;