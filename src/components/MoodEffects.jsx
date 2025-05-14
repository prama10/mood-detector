import React from 'react';
import Confetti from 'react-confetti';

const MoodEffects = ({ mood, visible, windowSize }) => {
  if (!visible) return null;

  switch (mood) {
    case 'happy':
      return <Confetti width={windowSize.width} height={windowSize.height} style={{ zIndex: 999 }} />;
    case 'sad':
      return <div className="animated-text below-video">🌧 It's okay to feel blue.</div>;
    case 'angry':
      return <div className="pulse red">🔥</div>;
    case 'surprised':
      return <div className="bounce">💥</div>;
    case 'fearful':
      return <div className="floaty">👻</div>;
    case 'disgusted':
      return <div className="disgusted-effect">🤢</div>;
    default:
      return null;
  }
};

export default MoodEffects;
