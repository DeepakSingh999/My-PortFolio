import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Certificate from './components/Certificate';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import FloatingBubbles from './components/FloatingBubbles';
import ChatWidget from './components/ChatWidget';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [speechState, setSpeechState] = useState({
    isSpeaking: false,
    currentWordIndex: -1,
    speakingSection: null,
    speechTexts: {}
  });
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  // Scroll spy - detect which section is in view
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'achievements', 'contact', 'resume'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            // Add visible class to trigger animation
            element.classList.add('section-visible');
            break;
          }
        }
      }
    };

    // Trigger on initial load
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // Smooth ring follow
    const animateRing = () => {
      setRingPosition(prev => ({
        x: prev.x + (cursorPosition.x - prev.x) * 0.15,
        y: prev.y + (cursorPosition.y - prev.y) * 0.15,
      }));
      requestAnimationFrame(animateRing);
    };
    const ringAnimation = requestAnimationFrame(animateRing);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .clickable, .nav-item, .social-link, .cert-card, .achievement-card, .project-card')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .clickable, .nav-item, .social-link, .cert-card, .achievement-card, .project-card')) {
        setIsHovering(true);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(ringAnimation);
    };
  }, [cursorPosition.x, cursorPosition.y]);

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Theme Toggle */}
      <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
      
      {/* Custom Diamond Cursor */}
      <div 
        className={`cursor-diamond ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      />
      <div 
        className={`cursor-trail ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{ left: ringPosition.x, top: ringPosition.y }}
      />
      <div 
        className={`cursor-glow ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{ left: ringPosition.x, top: ringPosition.y }}
      />
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <FloatingBubbles />
      <ChatWidget />
      <ScrollToTop />
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={scrollToSection} 
        onExpandChange={setIsSidebarExpanded}
        onSpeechStateChange={setSpeechState}
        speechEnabled={speechEnabled}
        onSpeechToggle={() => {
          if (speechEnabled) {
            window.speechSynthesis.cancel();
          }
          setSpeechEnabled(!speechEnabled);
        }}
      />
      <main className={`main-content ${isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <section id="home" className="section">
          <Home speechState={speechState} />
        </section>
        <section id="about" className="section">
          <About speechState={speechState} />
        </section>
        <section id="skills" className="section">
          <Skills speechEnabled={speechEnabled} />
        </section>
        <section id="projects" className="section">
          <Portfolio speechEnabled={speechEnabled} />
        </section>
        <section id="certificates" className="section">
          <Certificate speechEnabled={speechEnabled} />
        </section>
        <section id="achievements" className="section">
          <Achievements speechEnabled={speechEnabled} />
        </section>
        <section id="contact" className="section">
          <Contact speechEnabled={speechEnabled} />
        </section>
        <section id="resume" className="section">
          <Resume speechEnabled={speechEnabled} />
        </section>
      </main>
    </div>
  );
}

export default App;
