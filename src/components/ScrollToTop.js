import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg 
        className="progress-ring" 
        viewBox="0 0 50 50"
      >
        <circle
          className="progress-ring-bg"
          cx="25"
          cy="25"
          r="22"
        />
        <circle
          className="progress-ring-fill"
          cx="25"
          cy="25"
          r="22"
          style={{
            strokeDasharray: `${2 * Math.PI * 22}`,
            strokeDashoffset: `${2 * Math.PI * 22 * (1 - scrollProgress / 100)}`
          }}
        />
      </svg>
      <span className="arrow-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 19V5M12 5L5 12M12 5L19 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};

export default ScrollToTop;
