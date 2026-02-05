import React from 'react';
import './Achievements.css';

const Achievements = ({ onBack }) => {
  const achievements = [
    {
      id: 1,
      title: 'HackerRank Profile',
      description: 'Active problem solver on HackerRank platform',
      image: 'https://hrcdn.net/fcore/assets/brand/logo-new-white-green-a5cb16e0ae.svg',
      date: '2025',
      color: '#00ea64',
      profileUrl: 'https://www.hackerrank.com/profile/deepaks86509',
    },
    {
      id: 2,
      title: 'LeetCode Profile',
      description: 'Solving DSA problems on LeetCode',
      image: 'https://leetcode.com/static/images/LeetCode_logo_rvs.png',
      date: '2025',
      color: '#ffa116',
      profileUrl: 'https://leetcode.com/u/Raymonds_Hacker/',
    },
    {
      id: 3,
      title: 'GeeksforGeeks Profile',
      description: 'Learning and practicing on GeeksforGeeks',
      image: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
      date: '2025',
      color: '#2f8d46',
      profileUrl: 'https://www.geeksforgeeks.org/profile/singhdeepak90?tab=activity',
    },
  ];

  return (
    <section className="achievements-page">
      <button className="back-btn" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
      
      <h2 className="section-title">My <span className="highlight">Achievements</span></h2>
      <p className="section-subtitle">Milestones, certifications, and accomplishments</p>
      
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className="achievement-card" 
            style={{'--accent-color': achievement.color}}
            onClick={() => achievement.profileUrl && window.open(achievement.profileUrl, '_blank')}
          >
            <div className="achievement-icon">
              <img src={achievement.image} alt={achievement.title} />
            </div>
            <div className="achievement-content">
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
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
