import React, { useState, useEffect } from 'react';

const SimpleThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Apply theme on load
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: isDark ? '#4169E1' : '#1E3A8A',
        border: 'none',
        borderRadius: '30px',
        padding: '8px 20px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default SimpleThemeToggle;