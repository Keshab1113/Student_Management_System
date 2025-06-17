import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentTable from './components/StudentTable';
import StudentProfile from './components/StudentProfile';
import Navbar from './components/Navbar';
import { ThemeContext } from './context/ThemeContext';
import { fetchStudents, syncStudentData } from './services/api';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
        setLastUpdated(new Date());
        setLoading(false);
      } catch (error) {
        console.error('Error loading students:', error);
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  const handleSyncStudent = async (studentId, cfHandle) => {
    try {
      const updatedStudent = await syncStudentData(studentId, cfHandle);
      setStudents(students.map(s =>
        s.id === studentId ? updatedStudent : s
      ));
    } catch (error) {
      console.error('Error syncing student data:', error);
    }
  };

  return (
      <Router>
        <div className={`min-h-screen transition-colors duration-200 ${darkMode ? "bg-gray-900" :"bg-gray-300"}`}>
          <Navbar lastUpdated={lastUpdated} />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/"
                element={
                  <StudentTable
                    students={students}
                    loading={loading}
                    onSyncStudent={handleSyncStudent}
                  />
                }
              />
              <Route path="/student/:id" element={<StudentProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;