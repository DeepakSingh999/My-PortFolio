import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button 
      className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          {/* Sun Icon */}
          <svg 
            className="sun-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          {/* Moon Icon */}
          <svg 
            className="moon-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </div>
        
        {/* Stars decoration for dark mode */}
        <div className="toggle-stars">
          <span className="star star-1">✦</span>
          <span className="star star-2">✦</span>
          <span className="star star-3">✦</span>
        </div>
        
        {/* Clouds decoration for light mode */}
        <div className="toggle-clouds">
          <span className="cloud cloud-1">☁</span>
          <span className="cloud cloud-2">☁</span>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
