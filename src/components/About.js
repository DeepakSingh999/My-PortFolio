import React from 'react';
import AnimatedTitle from './AnimatedTitle';
import './About.css';

const About = ({ speechState }) => {
  const { isSpeaking, currentWordIndex, speakingSection } = speechState || {};

  // Render text with word highlighting
  const renderHighlightedText = (text, startWordIndex) => {
    const words = text.split(/\s+/);
    
    return words.map((word, index) => {
      const isCurrentWord = isSpeaking && 
                           speakingSection === 'about' && 
                           currentWordIndex === (index + startWordIndex);
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

  // First paragraph starts after "About Me." which is 2 words (index 0, 1)
  // So first para starts at index 2
  const firstPara = "I'm a Cloud Computing student with hands-on experience in AWS and containerized environments, focused on designing, deploying, and managing scalable, efficient cloud infrastructure using modern DevOps practices.";
  const firstParaWordCount = firstPara.split(/\s+/).length; // ~27 words
  
  const secondPara = "I learn by building and fixing real systems, prioritizing strong system fundamentals to adapt quickly to new technologies and real-world challenges.";

  return (
    <section className="about">
      <AnimatedTitle 
        text="About " 
        highlightText="Me" 
        speechState={speechState}
      />
      <div className="about-content">
        <div className="about-text">
          <p>
            {renderHighlightedText(firstPara, 2)}
          </p>
          <p>
            {renderHighlightedText(secondPara, 2 + firstParaWordCount)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
