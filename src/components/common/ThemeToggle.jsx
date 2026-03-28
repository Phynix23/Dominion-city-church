import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check current theme from localStorage or default to dark
    const saved = localStorage.getItem('theme');
    if (saved === 'light') return false;
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    console.log('Theme changing to:', isDark ? 'dark' : 'light');
    
    if (isDark) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggle clicked, current isDark:', isDark);
    setIsDark(!isDark);
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
        transition: 'all 0.3s ease',
      }}
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;