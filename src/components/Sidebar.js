import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection, onExpandChange, onSpeechStateChange, speechEnabled, onSpeechToggle }) => {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [speakingSection, setSpeakingSection] = useState(null);
  const speechRef = useRef(null);

  // Speech texts for each section
  const speechTexts = {
    home: "Hi, I am Deepak Singh. Cloud Computing student with hands-on experience in AWS and containerized systems, building reliable, scalable infrastructure through real-world projects, automation, and strong system fundamentals.",
    about: "About Me. I'm a Cloud Computing student with hands-on experience in AWS and containerized environments, focused on designing, deploying, and managing scalable, efficient cloud infrastructure using modern DevOps practices. I learn by building and fixing real systems, prioritizing strong system fundamentals to adapt quickly to new technologies and real-world challenges.",
    skills: "Skills",
    projects: "Projects",
    certificates: "Certificates",
    achievements: "Achievements",
    contact: "Contact Me",
    resume: "My Resume. Education: I am currently pursuing Bachelor of Technology from Lovely Professional University, Jalandhar, Punjab since 2023, focusing on Computer Science and Engineering with Cloud Computing and DevOps. Before this, I completed my Higher Secondary education from High School Jaynagar, Madhubani, Bihar from 2020 to 2022. Experience: I am currently working as a Web Development Intern at Startup Inc since 2024, where I develop landing pages and contribute to UI/UX improvements. I also work as a Frontend Developer at Tech Company since 2023, building responsive web applications using React.js and modern CSS frameworks.",
    hire: "Hire Me"
  };

  // Notify parent of speech state changes
  useEffect(() => {
    if (onSpeechStateChange) {
      onSpeechStateChange({
        isSpeaking,
        currentWordIndex,
        speakingSection,
        speechTexts
      });
    }
  }, [isSpeaking, currentWordIndex, speakingSection, speechTexts, onSpeechStateChange]);

  // Text-to-speech function with word tracking
  const speakText = (text, section) => {
    // Cancel any ongoing speech
    if (speechRef.current) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slower rate for smoother, more natural speech
    utterance.pitch = 1.0; // Natural pitch for better clarity
    utterance.volume = 0.9; // Slightly lower volume for smoother sound
    
    // Try to use a smooth, high-quality English voice
    const voices = window.speechSynthesis.getVoices();
    // Prefer high-quality voices like Google, Microsoft, or Apple's enhanced voices
    const smoothVoice = voices.find(voice => 
      voice.lang.includes('en') && (
        voice.name.includes('Google') ||
        voice.name.includes('Enhanced') ||
        voice.name.includes('Premium') ||
        voice.name.includes('Natural')
      )
    ) || voices.find(voice => 
      voice.lang.includes('en') && (
        voice.name.includes('Male') || 
        voice.name.includes('David') || 
        voice.name.includes('Daniel') ||
        voice.name.includes('Alex')
      )
    ) || voices.find(voice => 
      voice.lang.includes('en-US') || voice.lang.includes('en-GB')
    ) || voices.find(voice => voice.lang.includes('en'));
    
    if (smoothVoice) {
      utterance.voice = smoothVoice;
      console.log('Using voice:', smoothVoice.name);
    }

    // Track word boundaries
    const words = text.split(/\s+/);
    
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        // Calculate word index from character index
        const charIndex = event.charIndex;
        let charCount = 0;
        for (let i = 0; i < words.length; i++) {
          if (charCount >= charIndex) {
            setCurrentWordIndex(i);
            break;
          }
          charCount += words[i].length + 1; // +1 for space
        }
      }
    };

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingSection(section);
      setCurrentWordIndex(0);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentWordIndex(-1);
      setSpeakingSection(null);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentWordIndex(-1);
      setSpeakingSection(null);
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Load voices on mount
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(isExpanded);
    }
  }, [isExpanded, onExpandChange]);

  const playClickSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  };

  const handleNavClick = (itemId) => {
    playClickSound();
    setActiveSection(itemId);
    
    // Speak text only if speech is enabled
    if (speechEnabled && speechTexts[itemId]) {
      // Small delay to let the click sound finish
      setTimeout(() => {
        speakText(speechTexts[itemId], itemId);
      }, 200);
    } else {
      // Stop speaking when navigating to other sections
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentWordIndex(-1);
      setSpeakingSection(null);
    }
  };

  // Stop speech button handler
  // This is handled in useEffect cleanup
  const menuItems = [
    { id: 'home', label: 'HOME', icon: '🏠' },
    { id: 'about', label: 'ABOUT', icon: '👤' },
    { id: 'skills', label: 'SKILLS', icon: '⚡' },
    { id: 'projects', label: 'PROJECTS', icon: '💼' },
    { id: 'certificates', label: 'CERTIFICATES', icon: '📜' },
    { id: 'achievements', label: 'ACHIEVEMENTS', icon: '🏆' },
    { id: 'contact', label: 'CONTACT ME', icon: '✉️' },
    { id: 'resume', label: 'RESUME', icon: '📄' },
  ];

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <span className="toggle-icon">{isExpanded ? '◀' : '▶'}</span>
      </button>

      <div className="profile-wrapper">
        <div 
          className={`profile-image ${isImageZoomed ? 'zoomed' : ''}`} 
          onClick={() => setIsImageZoomed(!isImageZoomed)}
        >
          <img 
            src="/images/profile.png" 
            alt="Deepak Singh"
          />
        </div>
        {isImageZoomed && isExpanded && (
          <div className="profile-title">
            <span className="title-text">Cloud & DevOps Engineer</span>
          </div>
        )}
      </div>

      {/* Backdrop for zoomed image */}
      {isImageZoomed && (
        <div className="zoom-backdrop" onClick={() => setIsImageZoomed(false)} />
      )}

      <nav className="nav-menu">
        {menuItems.map((item, menuIndex) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''} ${isSpeaking && activeSection === item.id ? 'speaking' : ''}`}
            onClick={() => handleNavClick(item.id)}
            style={{ animationDelay: `${menuIndex * 0.1}s` }}
            title={!isExpanded ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* Speech ON/OFF Toggle */}
      <button 
        className={`speech-toggle-btn ${speechEnabled ? 'enabled' : 'disabled'}`}
        onClick={onSpeechToggle}
        title={speechEnabled ? 'Voice ON - Click to turn OFF' : 'Voice OFF - Click to turn ON'}
      >
        <span className="toggle-label">{speechEnabled ? 'ON' : 'OFF'}</span>
        <span className="toggle-switch">
          <span className="toggle-slider"></span>
        </span>
      </button>
      
      <button className="hire-btn" onClick={() => {
        playClickSound();
        setActiveSection('contact');
        if (speechEnabled) {
          setTimeout(() => {
            speakText(speechTexts.hire, 'hire');
          }, 200);
        }
      }}>
        <span className="hire-icon">💼</span>
        <span className="hire-label">Hire Me</span>
      </button>
    </aside>
  );
};

export default Sidebar;
