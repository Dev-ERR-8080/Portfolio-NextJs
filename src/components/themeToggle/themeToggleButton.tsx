import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import styles from './themeToggleButton.module.css'

const ThemeToggleButton = () => {
    // State to manage dark mode
    const [darkMode, setDarkMode] = useState(false);

    // Effect to apply the dark class to the body
    useEffect(() => {
        document.body.classList.toggle('light', darkMode); // Toggle dark class
        document.body.classList.toggle('dark', !darkMode); // Toggle light class
    }, [darkMode]);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <button 
            onClick={toggleDarkMode} 
            className={styles.content}
        >
            {darkMode ?   <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
    );
};

export default ThemeToggleButton;
