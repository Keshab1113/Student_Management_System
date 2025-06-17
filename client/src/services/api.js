// Mock API service - in a real app, these would be actual API calls to your backend

export const fetchStudents = async () => {
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    phone: '123-456-7890',
                    cfHandle: 'john_cf',
                    currentRating: 1500,
                    maxRating: 1600,
                    lastUpdated: '2023-05-15T10:30:00Z',
                    syncTime: '02:00',
                    syncFrequency: 'daily',
                    emailReminders: true,
                    reminderCount: 2,
                    lastReminderSent: '2023-05-10T08:00:00Z'
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    phone: '987-654-3210',
                    cfHandle: 'jane_cf',
                    currentRating: 2100,
                    maxRating: 2200,
                    lastUpdated: '2023-05-14T09:15:00Z',
                    syncTime: '03:00',
                    syncFrequency: 'daily',
                    emailReminders: false,
                    reminderCount: 0,
                    lastReminderSent: null
                }
            ]);
        }, 500);
    });
};

export const fetchStudentProfile = async (id) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: parseInt(id),
                name: id === '1' ? 'John Doe' : 'Jane Smith',
                email: id === '1' ? 'john@example.com' : 'jane@example.com',
                phone: id === '1' ? '123-456-7890' : '987-654-3210',
                cfHandle: id === '1' ? 'john_cf' : 'jane_cf',
                currentRating: id === '1' ? 1500 : 2100,
                maxRating: id === '1' ? 1600 : 2200,
                lastUpdated: id === '1' ? '2023-05-15T10:30:00Z' : '2023-05-14T09:15:00Z',
                syncTime: id === '1' ? '02:00' : '03:00',
                syncFrequency: 'daily',
                emailReminders: id === '1',
                reminderCount: id === '1' ? 2 : 0,
                lastReminderSent: id === '1' ? '2023-05-10T08:00:00Z' : null
            });
        }, 500);
    });
};

export const fetchContestHistory = async (studentId, days) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const baseContests = [
                {
                    contestId: 123,
                    contestName: 'Codeforces Round #123',
                    contestTime: Date.now() / 1000 - (days === '30' ? 10 : days === '90' ? 40 : 200) * 24 * 60 * 60,
                    rank: 150,
                    solvedCount: 3,
                    totalProblems: 5,
                    ratingChange: studentId === '1' ? 50 : 30,
                    newRating: studentId === '1' ? 1500 : 2100
                },
                {
                    contestId: 124,
                    contestName: 'Codeforces Round #124',
                    contestTime: Date.now() / 1000 - (days === '30' ? 5 : days === '90' ? 20 : 150) * 24 * 60 * 60,
                    rank: 200,
                    solvedCount: 2,
                    totalProblems: 5,
                    ratingChange: studentId === '1' ? -20 : 10,
                    newRating: studentId === '1' ? 1480 : 2110
                }
            ];

            // Filter based on days
            const cutoff = Date.now() / 1000 - parseInt(days) * 24 * 60 * 60;
            resolve(baseContests.filter(c => c.contestTime >= cutoff));
        }, 500);
    });
};

export const fetchProblemData = async (studentId, days) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                totalSolved: studentId === '1' ? 45 : 78,
                averageRating: studentId === '1' ? 1200 : 1600,
                averageProblemsPerDay: studentId === '1' ? 1.5 : 2.6,
                hardestProblem: {
                    contestId: 123,
                    index: 'D',
                    name: studentId === '1' ? 'Hard Problem' : 'Very Hard Problem',
                    rating: studentId === '1' ? 1800 : 2200
                },
                ratingDistribution: [
                    { ratingRange: '800-999', count: studentId === '1' ? 5 : 2 },
                    { ratingRange: '1000-1199', count: studentId === '1' ? 10 : 5 },
                    { ratingRange: '1200-1399', count: studentId === '1' ? 15 : 10 },
                    { ratingRange: '1400-1599', count: studentId === '1' ? 10 : 15 },
                    { ratingRange: '1600-1799', count: studentId === '1' ? 5 : 20 },
                    { ratingRange: '1800-1999', count: studentId === '1' ? 0 : 15 },
                    { ratingRange: '2000+', count: studentId === '1' ? 0 : 11 }
                ],
                submissionCalendar: generateSubmissionCalendar(days)
            });
        }, 500);
    });
};

export const addStudent = async (studentData) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: Math.floor(Math.random() * 1000) + 3,
                ...studentData,
                currentRating: 0,
                maxRating: 0,
                lastUpdated: null,
                syncTime: '02:00',
                syncFrequency: 'daily',
                emailReminders: true,
                reminderCount: 0,
                lastReminderSent: null
            });
        }, 500);
    });
};

export const updateStudent = async (id, studentData) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id,
                ...studentData,
                currentRating: id === 1 ? 1500 : 2100,
                maxRating: id === 1 ? 1600 : 2200,
                lastUpdated: new Date().toISOString(),
                syncTime: '02:00',
                syncFrequency: 'daily',
                emailReminders: true,
                reminderCount: id === 1 ? 2 : 0,
                lastReminderSent: id === 1 ? '2023-05-10T08:00:00Z' : null
            });
        }, 500);
    });
};

export const syncStudentData = async (studentId, cfHandle) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: studentId,
                name: studentId === 1 ? 'John Doe' : 'Jane Smith',
                email: studentId === 1 ? 'john@example.com' : 'jane@example.com',
                phone: studentId === 1 ? '123-456-7890' : '987-654-3210',
                cfHandle,
                currentRating: studentId === 1 ? 1550 : 2150,
                maxRating: studentId === 1 ? 1650 : 2250,
                lastUpdated: new Date().toISOString(),
                syncTime: '02:00',
                syncFrequency: 'daily',
                emailReminders: true,
                reminderCount: studentId === 1 ? 2 : 0,
                lastReminderSent: studentId === 1 ? '2023-05-10T08:00:00Z' : null
            });
        }, 1000);
    });
};

export const updateSyncSettings = async (studentId, settings) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                success: true
            });
        }, 500);
    });
};

// Helper function to generate mock submission calendar data
function generateSubmissionCalendar(days) {
    const count = parseInt(days);
    const result = [];
    for (let i = 0; i < count; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        result.push({
            date: date.toISOString().split('T')[0],
            count: Math.floor(Math.random() * 10)
        });
    }
    return result;
  }