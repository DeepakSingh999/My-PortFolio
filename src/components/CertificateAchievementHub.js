import React, { useState, useEffect, useRef } from 'react';
import AnimatedTitle from './AnimatedTitle';
import './CertificateAchievementHub.css';

const CertificateAchievementHub = ({ speechEnabled }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(null);
  const containerRef = useRef(null);

  // Text-to-speech function for certificates and achievements
  const speakItem = (item) => {
    window.speechSynthesis.cancel();
    let text;
    if (item.type === 'certificate') {
      text = `${item.title}. This certificate was issued by ${item.issuer}, mentored by ${item.mentor}. Completed in ${item.date}. Credential ID: ${item.credentialId}. This certification involved ${item.stats.hours} hours of learning and solving ${item.stats.problems || item.stats.projects} with a rating of ${item.stats.rating}.`;
    } else {
      text = `${item.title}. ${item.description}. Achievements include ${item.stats.badges || item.stats.solved || item.stats.score} badges or problems solved, with ${item.stats.stars || item.stats.contests || item.stats.articles} stars or contests, and ranked ${item.stats.rank || item.stats.streak}.`;
    }
    
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

  const allItems = [
    // Certificates
    {
      id: 1,
      type: 'certificate',
      title: 'Data Structure and Algorithms with C++',
      issuer: 'Code Help',
      mentor: 'Love Babbar',
      date: 'December 2025',
      credentialId: '3VCCYASR',
      image: '/images/dsa-cert.png',
      color: '#6366f1',
      icon: '🎓',
      stats: { hours: '150+', problems: '500+', rating: '4.9' }
    },
    {
      id: 2,
      type: 'certificate',
      title: 'Data Structure and Algorithms with Java',
      issuer: 'Apna College',
      mentor: 'Shradha Khapra',
      date: '2025',
      credentialId: 'VERIFIED',
      image: '/images/apna-cert.jpeg',
      color: '#10b981',
      icon: '☕',
      stats: { hours: '100+', problems: '400+', rating: '4.8' }
    },
    {
      id: 3,
      type: 'certificate',
      title: 'Technology Job Simulation',
      issuer: 'Deloitte',
      mentor: 'Forage',
      date: 'August 2025',
      credentialId: 'MGGMR2o7wPMFXhWqb',
      image: '/images/deloitte-cert.jpeg',
      color: '#86bc25',
      icon: '💼',
      stats: { hours: '40+', projects: '3', rating: '5.0' }
    },
    // Achievements
    {
      id: 4,
      type: 'achievement',
      title: 'HackerRank Profile',
      description: 'Active problem solver on HackerRank platform',
      image: 'https://hrcdn.net/fcore/assets/brand/logo-new-white-green-a5cb16e0ae.svg',
      date: '2025',
      color: '#00ea64',
      icon: 'hackerrank',
      profileUrl: 'https://www.hackerrank.com/profile/deepaks86509',
      stats: { badges: '15+', stars: '5⭐', rank: 'Gold' }
    },
    {
      id: 5,
      type: 'achievement',
      title: 'LeetCode Profile',
      description: 'Solving DSA problems on LeetCode',
      image: 'https://leetcode.com/static/images/LeetCode_logo_rvs.png',
      date: '2025',
      color: '#ffa116',
      icon: 'leetcode',
      profileUrl: 'https://leetcode.com/u/Raymonds_Hacker/',
      stats: { solved: '200+', contests: '10+', rank: 'Top 20%' }
    },
    {
      id: 6,
      type: 'achievement',
      title: 'GeeksforGeeks Profile',
      description: 'Learning and practicing on GeeksforGeeks',
      image: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
      date: '2025',
      color: '#2f8d46',
      icon: 'gfg',
      profileUrl: 'https://www.geeksforgeeks.org/profile/singhdeepak90?tab=activity',
      stats: { score: '500+', articles: '5+', streak: '30 days' }
    },
  ];

  const categories = [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'certificate', label: 'Certificates', icon: '📜' },
    { id: 'achievement', label: 'Achievements', icon: '🏆' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.type === activeCategory);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleCardClick = (item) => {
    if (speechEnabled) {
      speakItem(item);
    }
    if (item.profileUrl) {
      window.open(item.profileUrl, '_blank');
    } else {
      setSelectedItem(item);
    }
  };

  const closeModal = () => setSelectedItem(null);

  return (
    <section className="credentials-galaxy" ref={containerRef}>
      {/* Animated Background Elements */}
      <div className="galaxy-bg">
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="star-field">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="star" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        <div className="orbit-ring orbit-1"></div>
        <div className="orbit-ring orbit-2"></div>
      </div>

      {/* Floating Cursor Effect */}
      <div 
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      />

      {/* Header Section */}
      <div className="galaxy-header">
        <div className="title-container">
          <span className="title-decoration">✦</span>
          <div className="galaxy-title-wrapper">
            <AnimatedTitle text="Credentials " highlightText="& Achievements" className="galaxy-animated-title" />
          </div>
          <span className="title-decoration">✦</span>
        </div>
        <p className="galaxy-subtitle">
          <span className="typing-text">Explore the constellation of my professional journey</span>
        </p>
        
        {/* Category Pills */}
        <div className="category-orbit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="pill-icon">{cat.icon}</span>
              <span className="pill-label">{cat.label}</span>
              <span className="pill-count">
                {cat.id === 'all' ? allItems.length : allItems.filter(i => i.type === cat.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid with Hexagonal Layout */}
      <div className="hex-grid">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={`hex-card ${isHovering === item.id ? 'hovering' : ''}`}
            style={{ 
              '--card-color': item.color,
              '--card-index': index,
              animationDelay: `${index * 0.1}s`
            }}
            onMouseEnter={() => setIsHovering(item.id)}
            onMouseLeave={() => setIsHovering(null)}
            onClick={() => handleCardClick(item)}
          >
            <div className="hex-glow"></div>
            <div className="hex-border"></div>
            
            <div className="hex-content">
              {/* Card Header */}
              <div className="hex-header">
                <div className="hex-icon-container">
                  {item.icon === 'leetcode' ? (
                    <svg className="platform-icon leetcode" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                    </svg>
                  ) : item.icon === 'hackerrank' ? (
                    <svg className="platform-icon hackerrank" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.885-10.395-6c-.641-1.115-.641-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701c.141 0 .254-.115.254-.258 0-.094-.049-.176-.123-.221L9.223 4.896c-.07-.078-.168-.127-.278-.127-.108 0-.207.049-.278.127L7.076 6.429c-.072.045-.12.126-.12.218 0 .143.113.258.255.258h.7v9.793c0 .143.116.26.259.26h1.035c.143 0 .26-.117.26-.26v-3.871h4.074v3.871c0 .143.115.26.259.26h1.035c.143 0 .258-.117.258-.26V6.908h.699c.142 0 .258-.115.258-.258 0-.092-.05-.174-.121-.219l-1.594-1.533c-.07-.078-.168-.127-.279-.127-.107 0-.209.049-.279.127l-1.593 1.533c-.073.045-.121.127-.121.219 0 .143.115.258.258.258h.699v3.875h-1.477V7.057c0-.143-.116-.258-.258-.258z"/>
                    </svg>
                  ) : item.icon === 'gfg' ? (
                    <svg className="platform-icon gfg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.292-.894c-.074-.313-.106-.628-.106-.964 0-.336.032-.651.106-.964.073-.313.175-.617.292-.894a3.79 3.79 0 0 1 2.135-2.078 4.51 4.51 0 0 1 3.116-.016c.418.157.8.385 1.104.695.231.213.422.465.565.745.143.28.237.594.292.943H24c-.054-.637-.213-1.218-.487-1.753a5.084 5.084 0 0 0-1.104-1.387 4.906 4.906 0 0 0-1.596-.958 5.347 5.347 0 0 0-1.96-.362c-.696 0-1.348.12-1.96.362a4.906 4.906 0 0 0-1.596.958 5.084 5.084 0 0 0-1.104 1.387 5.57 5.57 0 0 0-.565 1.753 6.9 6.9 0 0 0 0 2.768c.127.637.318 1.218.565 1.753a5.084 5.084 0 0 0 1.104 1.387c.46.418.994.745 1.596.958.612.213 1.264.319 1.96.319.696 0 1.348-.106 1.96-.319a4.906 4.906 0 0 0 1.596-.958 5.084 5.084 0 0 0 1.104-1.387c.274-.535.433-1.116.487-1.753h-2.257c-.055.35-.149.663-.292.943zM2.55 14.315c.143.28.334.532.565.745.304.31.686.538 1.104.695a4.51 4.51 0 0 0 3.116-.016 3.79 3.79 0 0 0 2.135-2.078c.117-.277.219-.58.292-.894.074-.313.106-.628.106-.964 0-.336-.032-.651-.106-.964a3.571 3.571 0 0 0-.292-.894 3.79 3.79 0 0 0-2.135-2.078 4.51 4.51 0 0 0-3.116-.016 3.691 3.691 0 0 0-1.104.695 2.655 2.655 0 0 0-.565.745 3.184 3.184 0 0 0-.292.943H0c.054-.637.213-1.218.487-1.753a5.084 5.084 0 0 1 1.104-1.387 4.906 4.906 0 0 1 1.596-.958A5.347 5.347 0 0 1 5.147 6c.696 0 1.348.12 1.96.362.602.242 1.136.56 1.596.958.46.399.834.867 1.104 1.387.274.535.433 1.116.487 1.753h2.257c.055-.35.149-.663.292-.943a2.655 2.655 0 0 1 .565-.745c-.143-.28-.334-.532-.565-.745a3.691 3.691 0 0 0-1.104-.695 4.51 4.51 0 0 0-3.116.016 3.79 3.79 0 0 0-2.135 2.078c-.117.277-.219.58-.292.894a4.65 4.65 0 0 0-.106.964c0 .336.032.651.106.964.073.313.175.617.292.894a3.79 3.79 0 0 0 2.135 2.078 4.51 4.51 0 0 0 3.116.016c.418-.157.8-.385 1.104-.695.231-.213.422-.465.565-.745.143-.28.237-.594.292-.943h2.257a5.57 5.57 0 0 1-.565 1.753 5.084 5.084 0 0 1-1.104 1.387 4.906 4.906 0 0 1-1.596.958 5.347 5.347 0 0 1-1.96.362c-.696 0-1.348-.106-1.96-.319a4.906 4.906 0 0 1-1.596-.958 5.084 5.084 0 0 1-1.104-1.387 5.57 5.57 0 0 1-.565-1.753H.001c.055.35.149.663.292.943z"/>
                    </svg>
                  ) : (
                    <span className="hex-icon">{item.icon}</span>
                  )}
                  <div className="hex-icon-ring"></div>
                </div>
                <div className="hex-badges">
                  <span className={`type-badge ${item.type}`}>
                    {item.type === 'certificate' ? '📜' : '🏆'}
                  </span>
                  <span className="verified-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Verified
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="hex-body">
                <h3 className="hex-title">{item.title}</h3>
                <div className="hex-meta">
                  <span className="issuer">{item.issuer || item.description}</span>
                  {item.mentor && (
                    <>
                      <span className="meta-dot">•</span>
                      <span className="mentor">{item.mentor}</span>
                    </>
                  )}
                </div>
                
                {/* Stats Row */}
                <div className="hex-stats">
                  {Object.entries(item.stats).map(([key, value]) => (
                    <div key={key} className="stat-item">
                      <span className="stat-value">{value}</span>
                      <span className="stat-label">{key}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="hex-footer">
                <div className="hex-date">
                  <span className="date-icon">📅</span>
                  <span>{item.date}</span>
                </div>
                <button className="hex-action">
                  <span>{item.profileUrl ? 'View Profile' : 'View Details'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Hover Effect Particles */}
            <div className="hex-particles">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="particle" style={{ '--i': i }}></span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Certificate View */}
      {selectedItem && (
        <div className="galaxy-modal-overlay" onClick={closeModal}>
          <div className="galaxy-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="modal-glow" style={{ '--modal-color': selectedItem.color }}></div>
            
            <div className="modal-content">
              <div className="modal-icon">{selectedItem.icon}</div>
              <h3 className="modal-title">{selectedItem.title}</h3>
              <p className="modal-issuer">{selectedItem.issuer} • {selectedItem.mentor}</p>
              
              <div className="modal-image-container">
                <img src={selectedItem.image} alt={selectedItem.title} />
              </div>
              
              <div className="modal-details">
                <div className="detail-row">
                  <span className="detail-icon">📅</span>
                  <span>{selectedItem.date}</span>
                </div>
                {selectedItem.credentialId && (
                  <div className="detail-row">
                    <span className="detail-icon">🔐</span>
                    <span className="credential">{selectedItem.credentialId}</span>
                  </div>
                )}
              </div>
              
              <div className="modal-stats">
                {Object.entries(selectedItem.stats).map(([key, value]) => (
                  <div key={key} className="modal-stat">
                    <span className="stat-val">{value}</span>
                    <span className="stat-key">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificateAchievementHub;
