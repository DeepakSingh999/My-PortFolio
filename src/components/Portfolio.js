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
      title: 'E-Commerce Website',
      category: 'Web Development',
      description: 'A fully functional online shopping platform with product catalog, shopping cart, and secure checkout features built using React and Node.js.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
      link: '#',
    },
    {
      id: 2,
      title: 'Portfolio Design',
      category: 'UI/UX Design',
      description: 'A modern and responsive portfolio website showcasing creative work with smooth animations and interactive elements.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
      link: '#',
    },
    {
      id: 3,
      title: 'Mobile App UI',
      category: 'App Design',
      description: 'A clean and intuitive mobile application interface design focused on user experience and accessibility.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      link: '#',
    },
    {
      id: 4,
      title: 'Dashboard Design',
      category: 'Web Application',
      description: 'An analytics dashboard with real-time data visualization, charts, and interactive reports for business insights.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      link: '#',
    },
    {
      id: 5,
      title: 'Landing Page',
      category: 'Web Development',
      description: 'A high-converting landing page with compelling design, call-to-action buttons, and optimized for lead generation.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
      link: '#',
    },
    {
      id: 6,
      title: 'Blog Website',
      category: 'Web Development',
      description: 'A content management system based blog platform with article publishing, comments, and social sharing features.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
      link: '#',
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
