import React from 'react';
import './Home.css';

const Home = ({ speechState }) => {
  const { isSpeaking, currentWordIndex, speakingSection, speechTexts } = speechState || {};

  const renderAnimatedText = (text, isHighlight = false) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className={`letter ${isHighlight ? 'highlight-letter' : ''}`}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // Render description with word highlighting
  const renderHighlightedDescription = () => {
    const text = "Cloud Computing student with hands-on experience in AWS and containerized systems, building reliable, scalable infrastructure through real-world projects, automation, and strong system fundamentals.";
    const words = text.split(/\s+/);
    
    // The home speech text starts with "Hi, I am Deepak Singh. " which is 5 words (Hi, I am Deepak Singh.)
    // So we need to offset the currentWordIndex by 5
    const titleWordCount = 5; // "Hi," "I" "am" "Deepak" "Singh."
    
    return words.map((word, index) => {
      const isCurrentWord = isSpeaking && 
                           speakingSection === 'home' && 
                           currentWordIndex === (index + titleWordCount);
      return (
        <span 
          key={index} 
          className={`speech-word ${isCurrentWord ? 'speaking-word' : ''}`}
        >
          {word}{' '}
        </span>
      );
    });
  };

  // Check if title words are being spoken
  const getTitleHighlight = (wordIndex) => {
    // Title words: "Hi," (0), "I" (1), "am" (2), "Deepak" (3), "Singh" (4)
    return isSpeaking && speakingSection === 'home' && currentWordIndex === wordIndex;
  };

  return (
    <section className="home">
      <div className="hero-content">
        <h1 className="hero-title animated-hero">
          <span className={`speech-word ${getTitleHighlight(0) ? 'speaking-word' : ''}`}>
            {renderAnimatedText('Hi, ')}
          </span>
          <span className={`speech-word ${getTitleHighlight(1) ? 'speaking-word' : ''}`}>
            {renderAnimatedText('I ')}
          </span>
          <span className={`speech-word ${getTitleHighlight(2) ? 'speaking-word' : ''}`}>
            {renderAnimatedText('am ')}
          </span>
          <span className="highlight-name">
            <span className={`speech-word ${getTitleHighlight(3) ? 'speaking-word' : ''}`}>
              {renderAnimatedText('Deepak ', true)}
            </span>
            <span className={`speech-word ${getTitleHighlight(4) ? 'speaking-word' : ''}`}>
              {renderAnimatedText('Singh', true)}
            </span>
          </span>
        </h1>
        <p className="hero-description">
          {renderHighlightedDescription()}
        </p>
      </div>
    </section>
  );
};

export default Home;
