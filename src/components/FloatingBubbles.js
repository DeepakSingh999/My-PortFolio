import React from 'react';
import './FloatingBubbles.css';

const FloatingBubbles = () => {
  const bubbles = [
    { id: 1, size: 120, top: '15%', left: '25%', delay: 0 },
    { id: 2, size: 80, top: '60%', left: '15%', delay: 2 },
    { id: 3, size: 150, top: '50%', left: '70%', delay: 1 },
    { id: 4, size: 100, top: '30%', left: '85%', delay: 3 },
    { id: 5, size: 60, top: '75%', left: '35%', delay: 4 },
    { id: 6, size: 90, top: '20%', left: '55%', delay: 2.5 },
  ];

  return (
    <div className="floating-bubbles">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
            animationDelay: `${bubble.delay}s`,
          }}
        >
          <div className="bubble-inner"></div>
        </div>
      ))}
    </div>
  );
};

export default FloatingBubbles;
