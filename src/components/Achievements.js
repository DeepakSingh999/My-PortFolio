import React from 'react';
import './Achievements.css';

const Achievements = ({ onBack, speechEnabled }) => {
  const speakAchievement = (achievement) => {
    if (!speechEnabled) return;
    
    window.speechSynthesis.cancel();
    const text = `${achievement.title}. ${achievement.description}. Achievement date: ${achievement.date}.`;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.9;
    utterance.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(voice => 
      voice.lang.includes('en') && (
        voice.name.includes('Male') || 
        voice.name.includes('David') || 
        voice.name.includes('James')
      )
    ) || voices.find(voice => voice.lang.includes('en'));
    
    if (maleVoice) utterance.voice = maleVoice;
    window.speechSynthesis.speak(utterance);
  };
  const achievements = [
    {
      id: 1,
      title: 'HackerRank Profile',
      description: 'Active problem solver on HackerRank platform',
      image: 'https://hrcdn.net/fcore/assets/brand/logo-new-white-green-a5cb16e0ae.svg',
      date: '2025',
      color: '#00ea64',
      profileUrl: 'https://www.hackerrank.com/profile/deepaks86509',
      stats: { badges: '15+', stars: '5⭐', rank: 'Gold' }
    },
    {
      id: 2,
      title: 'LeetCode Profile',
      description: 'Solving DSA problems on LeetCode',
      image: 'https://leetcode.com/static/images/LeetCode_logo_rvs.png',
      date: '2025',
      color: '#ffa116',
      profileUrl: 'https://leetcode.com/u/Raymonds_Hacker/',
      stats: { solved: '100+', contests: '10+', rank: 'Top 20%' }
    },
    {
      id: 3,
      title: 'GeeksforGeeks Profile',
      description: 'Learning and practicing on GeeksforGeeks',
      image: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
      date: '2025',
      color: '#2f8d46',
      profileUrl: 'https://www.geeksforgeeks.org/profile/singhdeepak90?tab=activity',
      stats: { score: '500+', articles: '5+', streak: '30 days' }
    },
  ];

  return (
    <section className="achievements-page">
      <h2 className="section-title">My <span className="highlight">Achievements</span></h2>
      <p className="section-subtitle">Milestones, certifications, and accomplishments</p>
      
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className="achievement-card" 
            style={{'--accent-color': achievement.color}}
            onClick={() => {
              speakAchievement(achievement);
              if (achievement.profileUrl) {
                window.open(achievement.profileUrl, '_blank');
              }
            }}
          >
            <div className="achievement-icon">
              <img src={achievement.image} alt={achievement.title} />
            </div>
            <div className="achievement-content">
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              
              {achievement.stats && (
                <div className="achievement-stats">
                  {Object.entries(achievement.stats).map(([key, value]) => (
                    <div key={key} className="stat-item">
                      <span className="stat-value">{value}</span>
                      <span className="stat-label">{key}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <span className="achievement-date">{achievement.date}</span>
              {achievement.profileUrl && (
                <button className="profile-link-btn">
                  View Profile →
                </button>
              )}
            </div>
            <div className="achievement-glow"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
