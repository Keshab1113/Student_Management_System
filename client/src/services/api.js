const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchStudents = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/students`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const students = await response.json();
        return students;
    } catch (error) {
        console.error('Failed to fetch from server, using sample data:', error);       
    }
};


export const fetchStudentProfile = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/students/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch student from backend');
        }
        const student = await response.json();
        const cfHandle = student.codeforcesHandle;

        const cfResponse = await fetch(`https://codeforces.com/api/user.info?handles=${cfHandle}`);
        const cfData = await cfResponse.json();

        if (cfData.status !== 'OK') {
            throw new Error('Failed to fetch Codeforces data');
        }

        const cfUser = cfData.result[0];
        const lastUpdated = new Date(cfUser.lastOnlineTimeSeconds * 1000).toISOString();
        console.log("cfUser ", cfUser);

        return {
            id: student._id,
            name: student.name,
            email: student.email,
            phone: student.phone,
            cfHandle: cfUser.handle,
            currentRating: cfUser.rating || 0,
            maxRating: cfUser.maxRating || 0,
            lastUpdated: lastUpdated,
            syncTime: student.syncTime || '02:00',
            syncFrequency: student.syncFrequency || 'daily',
            emailReminders: student.emailReminders ?? true,
            reminderCount: student.reminderCount ?? 0,
            lastReminderSent: student.lastReminderSent ?? null
        };
    } catch (error) {
        console.error('Error fetching student profile:', error.message);
        return null;
    }
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
    try {
        const response = await fetch(`${BASE_URL}/api/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add student');
        }

        const newStudent = await response.json();
        return newStudent;
    } catch (error) {
        console.error('Error adding student:', error.message);
        throw error;
    }
};

export const updateStudent = async (id, studentData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update student');
        }

        const updatedStudent = await response.json();
        return updatedStudent;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
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

export const deleteStudent = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/students/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete student');
        }

        return true;
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
};


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