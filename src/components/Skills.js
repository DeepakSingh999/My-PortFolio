import React, { useState } from 'react';
import AnimatedTitle from './AnimatedTitle';
import './Skills.css';

const Skills = ({ speechEnabled }) => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Text-to-speech function for skills
  const speakSkill = (skillName) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(skillName);
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

  // All skills mixed together for globe display
  const allSkills = [
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#e34f26', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', percentage: 95 },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572b6', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', percentage: 92 },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#f7df1e', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', percentage: 88 },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb', url: 'https://react.dev/', percentage: 87 },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933', url: 'https://nodejs.org/', percentage: 89 },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#00599c', url: 'https://cplusplus.com/', percentage: 85 },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776ab', url: 'https://www.python.org/', percentage: 91 },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#ff9900', url: 'https://aws.amazon.com/', percentage: 88 },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ed', url: 'https://www.docker.com/', percentage: 90 },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', color: '#326ce5', url: 'https://kubernetes.io/', percentage: 86 },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#ffffff', url: 'https://github.com/', percentage: 94 },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47a248', url: 'https://www.mongodb.com/', percentage: 87 },
  ];

  const handleSkillClick = (skill) => {
    if (selectedSkill?.name === skill.name) {
      setSelectedSkill(null);
      setActiveSkill(null);
    } else {
      setSelectedSkill(skill);
      setActiveSkill(skill.name);
      if (speechEnabled) {
        speakSkill(skill.name);
      }
    }
  };

  const handleVisitClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <section className="skills">
      <AnimatedTitle text="My " highlightText="Skills" />
      <div className="skills-content">
        {/* Skill Detail Card */}
        {selectedSkill && (
          <div className="skill-detail-card" style={{ '--skill-color': selectedSkill.color }}>
            <div className="skill-detail-header">
              <img src={selectedSkill.icon} alt={selectedSkill.name} className="skill-detail-icon" />
              <h3>{selectedSkill.name}</h3>
              <button className="close-btn" onClick={() => { setSelectedSkill(null); setActiveSkill(null); }}>×</button>
            </div>
            <div className="skill-progress-container">
              <div className="skill-progress-bar">
                <div 
                  className="skill-progress-fill" 
                  style={{ 
                    width: `${selectedSkill.percentage}%`,
                    background: `linear-gradient(90deg, ${selectedSkill.color}, ${selectedSkill.color}aa)`
                  }}
                ></div>
              </div>
              <span className="skill-percentage">{selectedSkill.percentage}%</span>
            </div>
            <button className="visit-btn" onClick={(e) => handleVisitClick(e, selectedSkill.url)}>
              Visit {selectedSkill.name} →
            </button>
          </div>
        )}

        <div className="skills-globe-container">
          {/* Globe wireframe */}
          <div className="globe-wireframe">
            <div className="globe-circle globe-circle-1"></div>
            <div className="globe-circle globe-circle-2"></div>
            <div className="globe-circle globe-circle-3"></div>
            <div className="globe-horizontal globe-h-1"></div>
            <div className="globe-horizontal globe-h-2"></div>
            <div className="globe-horizontal globe-h-3"></div>
            <div className="globe-glow"></div>
          </div>
          
          {/* Orbiting skills */}
          <div className="skills-orbit-wrapper">
            {allSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`orbit-skill-item ${activeSkill === skill.name ? 'active' : ''}`}
                style={{
                  '--i': index,
                  '--total': allSkills.length,
                  '--skill-color': skill.color,
                }}
                onClick={() => handleSkillClick(skill)}
                title={`Click to see ${skill.name} proficiency`}
              >
                <div className="skill-icon-wrapper">
                  <img src={skill.icon} alt={skill.name} />
                  {activeSkill === skill.name && <div className="skill-pulse"></div>}
                </div>
                <span className="orbit-skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
