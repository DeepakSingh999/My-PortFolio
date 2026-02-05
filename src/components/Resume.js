import React, { useState } from 'react';
import AnimatedTitle from './AnimatedTitle';
import './Resume.css';

const Resume = ({ speechEnabled }) => {
  const [showCV, setShowCV] = useState(false);

  // Text-to-speech function for CV (commented out - not currently used)
  // const speakCV = () => {
  //   if (!speechEnabled) return;
  //   
  //   window.speechSynthesis.cancel();
  //   const cvText = `Deepak Singh's CV.
    
    Contact: Email deepaks86509@gmail.com, Mobile +91-7889140393.
    LinkedIn: linkedin.com/in/deepaksingh9999
    GitHub: github.com/DeepakSingh999
    
    Skills:
    Languages: Python, Java, C and C++.
    Frameworks: Tableau, HTML, CSS, React, Bootstrap.
    Tools and Platforms: Git, GitHub, MySQL, MongoDB.
    Soft Skills: Problem-Solving, Team Work, Leadership.
    
    Projects:
    
    First Project: Restaurant Management System using Core Java, developed from February 2025 to March 2025.
    Developed a Restaurant Management System using Core Java for streamlined restaurant operations.
    Implemented key features such as order management, menu handling, and billing using Object Oriented Programming concepts.
    Integrated MySQL database for secure data storage and efficient record management.
    
    Second Project: Mental Health Trends Analyzer, developed from February 2025 to April 2025.
    Engineered a Python-based analysis tool using Pandas and NumPy to process and clean a large-scale mental illness dataset from Kaggle.
    Built an interactive web application with Streamlit to visualize trends and correlations in mental health data.
    Created various plots with Matplotlib, such as demographic distributions and symptom frequency.
    
    Third Project: Airlines Reservation System using Core Java, developed from March 2025 to April 2025.
    Developed an Airlines Reservation System using Core Java for efficient flight booking operations.
    Implemented features such as ticket booking, cancellation, and passenger management using Object Oriented Programming concepts.
    
    Certificates:
    Data Structure And Algorithms from Apna College, completed in September 2024.
    Completed Deloitte Technology Job Simulation through Forage in August 2025, enhancing skills in coding and development.
    
    Achievements:
    Solved 250+ Data Structures and Algorithms problems on GeeksforGeeks.
    Completed 100+ coding challenges on LeetCode.
    Regularly participated in weekly coding contests, improving competitive programming skills.
    
    Education:
    Currently pursuing Bachelor of Technology in Computer Science and Engineering from Lovely Professional University.
    Completed Intermediate from HBJC College Khajuli with 79 percent.
    Completed Matriculation from +2 High School with 84 percent.`;
    
    const utterance = new SpeechSynthesisUtterance(cvText);
    utterance.rate = 0.9;
    utterance.pitch = 0.9;
    utterance.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(voice => 
      voice.lang.includes('en') && (
        voice.name.includes('Male') || 
        voice.name.includes('David') || 
        voice.name.includes('James') || 
        voice.name.includes('Daniel') ||
        voice.name.includes('Alex') ||
        voice.name.includes('Fred')
      )
    ) || voices.find(voice => 
      voice.lang.includes('en') && !voice.name.includes('Samantha') && !voice.name.includes('Victoria') && !voice.name.includes('Karen')
    ) || voices.find(voice => voice.lang.includes('en'));
    
    if (maleVoice) {
      utterance.voice = maleVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const handleViewCV = () => {
    setShowCV(true);
  };

  const education = [
    {
      year: '2023 - Present',
      title: 'Bachelor of Technology',
      institution: 'Lovely Professional University, Jalandhar, Punjab',
      description: 'Computer Science and Engineering with focus on Cloud Computing and DevOps.',
    },
    {
      year: '2020 - 2022',
      title: 'Higher Secondary (+2)',
      institution: 'High School Jaynagar, Madhubani, Bihar',
      description: '',
    },
  ];

  const experience = [
    {
      year: '2024 - Present',
      title: 'Web Development Intern',
      company: 'Startup Inc.',
      description: 'Developed landing pages and contributed to UI/UX improvements.',
    },
    {
      year: '2023 - Present',
      title: 'Frontend Developer',
      company: 'Tech Company',
      description: 'Building responsive web applications using React.js and modern CSS frameworks.',
    },
  ];

  return (
    <section className="resume">
      <AnimatedTitle text="My " highlightText="Resume" />
      <div className="resume-content">
        <div className="resume-column">
          <h3 className="column-title">Education</h3>
          {education.map((item, index) => (
            <div key={index} className="resume-item">
              <span className="year">{item.year}</span>
              <h4 className="item-title">{item.title}</h4>
              <p className="institution">{item.institution}</p>
              <p className="description">{item.description}</p>
            </div>
          ))}
          <button className="view-cv-btn" onClick={handleViewCV}>
            <span>📄</span> View CV
          </button>
        </div>
        <div className="resume-column">
          <h3 className="column-title">Experience</h3>
          {experience.map((item, index) => (
            <div key={index} className="resume-item">
              <span className="year">{item.year}</span>
              <h4 className="item-title">{item.title}</h4>
              <p className="institution">{item.company}</p>
              <p className="description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CV Modal */}
      {showCV && (
        <div className="cv-modal-overlay" onClick={() => {
          setShowCV(false);
          window.speechSynthesis.cancel();
        }}>
          <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cv-modal-close" onClick={() => {
              setShowCV(false);
              window.speechSynthesis.cancel();
            }}>✕</button>
            <div className="cv-modal-header">
              <h3>My CV / Resume</h3>
            </div>
            <div className="cv-modal-body">
              <iframe 
                src="/cv/Deepak_Singh_CV.pdf" 
                title="Deepak Singh CV"
                className="cv-iframe"
              />
            </div>
            <div className="cv-modal-footer">
              <a 
                href="/cv/Deepak_Singh_CV.pdf" 
                download="Deepak_Singh_CV.pdf"
                className="cv-download-btn"
              >
                <span>⬇️</span> Download CV
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Resume;
