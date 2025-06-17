import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = ({ lastUpdated }) => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    return (
        <nav className={`shadow-md mb-8 transition-colors duration-200 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className={`md:text-xl text-sm font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
                >
                    Student Progress Tracker
                </Link>
                <div className="flex items-center space-x-4">
                    <span className={`md:text-sm text-[10px]  ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {lastUpdated && `Last updated: ${lastUpdated.toLocaleString()}`}
                    </span>
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full cursor-pointer ${darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-700"}`}
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
