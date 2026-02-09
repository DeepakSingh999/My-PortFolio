import React from 'react';
import AnimatedTitle from './AnimatedTitle';
import './Portfolio.css';

const Portfolio = ({ speechEnabled }) => {
  // Text-to-speech function for projects
  const speakProject = (title, category, description) => {
    window.speechSynthesis.cancel();
    const text = `${title}. This is a ${category} project. ${description}`;
    const utterance = new SpeechSynthesisUtterance(text);
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

  const projects = [
    {
      id: 1,
      title: 'Snake Game',
      category: 'Web Development',
      description: 'A classic Snake game built with modern web technologies featuring smooth animations, score tracking, and responsive controls.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
      link: 'https://github.com/DeepakSingh999/Snake-Game-Python',
    },
    {
      id: 2,
      title: 'AI App',
      category: 'Artificial Intelligence',
      description: 'An intelligent application powered by AI/ML algorithms for smart predictions, recommendations, and automated decision making.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      link: '#',
    },
    {
      id: 3,
      title: 'Weather App',
      category: 'Mobile App',
      description: 'A weather forecasting application with real-time updates, location-based weather data, and beautiful visual representations.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop',
      link: 'https://whether-project-neon.vercel.app',
    },
  ];

  const handleProjectClick = (project) => {
    if (speechEnabled) {
      speakProject(project.title, project.category, project.description);
    }
  };

  return (
    <section className="portfolio">
      <AnimatedTitle text="My " highlightText="Projects" />
      <div className="portfolio-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="portfolio-item"
            onClick={() => handleProjectClick(project)}
          >
            <div className="portfolio-image">
              <img src={project.image} alt={project.title} />
              <div className="portfolio-overlay">
                <h4>{project.title}</h4>
                <p>{project.category}</p>
                <span className="speak-icon">🔊</span>
                <a href={project.link} className="view-btn" onClick={(e) => e.stopPropagation()}>View Project</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
