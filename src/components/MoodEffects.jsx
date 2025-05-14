import React from 'react';
import Confetti from 'react-confetti';

const MoodEffects = ({ mood, visible, windowSize }) => {
  if (!visible) return null;

  switch (mood) {
    case 'happy':
      return <Confetti width={windowSize.width} height={windowSize.height} style={{ zIndex: 999 }} />;
    case 'sad':
      return (
        <>
          <div className="animated-text below-video">🌧 It's okay to feel blue.</div>
          <div className="rain-container">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="raindrop"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random()}s`,
                  animationDuration: `${0.5 + Math.random()}s`,
                }}
              />
            ))}
          </div>
        </>
      );
    case 'angry':
      return (
        <>
          <div className="pulse red">🔥</div>
          <div className="ring" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        </>
      );
    case 'surprised':
      return <div className="flash">⚡️</div>;
    case 'fearful':
      return <div className="mist">👻</div>;
    case 'disgusted':
      return <div className="disgusted-effect">🤢</div>;
    default:
      return null;
  }
};

export default MoodEffects;