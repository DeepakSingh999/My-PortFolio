import React from 'react';
import './AnimatedTitle.css';

const AnimatedTitle = ({ text, highlightText, className = '', speechState }) => {
  const { isSpeaking, currentWordIndex, speakingSection } = speechState || {};

  // Split text into individual letters for animation
  const renderAnimatedText = (str, isHighlight = false) => {
    return str.split('').map((char, index) => (
      <span
        key={index}
        className={`letter ${isHighlight ? 'highlight-letter' : ''}`}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // Check if "About" (word 0) or "Me" (word 1) is being spoken
  const isAboutSpeaking = isSpeaking && speakingSection === 'about' && currentWordIndex === 0;
  const isMeSpeaking = isSpeaking && speakingSection === 'about' && currentWordIndex === 1;

  return (
    <h2 className={`animated-title ${className}`}>
      <span className={`title-text speech-word ${isAboutSpeaking ? 'speaking-word' : ''}`}>
        {renderAnimatedText(text)}
      </span>
      {highlightText && (
        <span className={`title-highlight speech-word ${isMeSpeaking ? 'speaking-word' : ''}`}>
          {renderAnimatedText(highlightText, true)}
        </span>
      )}
      <span className="title-underline"></span>
    </h2>
  );
};

export default AnimatedTitle;
