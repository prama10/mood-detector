import React from 'react';

const MoodDisplay = ({ mood }) => (
  <div className="mood-display">
    <p>Detected Mood: <strong>{mood}</strong></p>
  </div>
);

export default MoodDisplay;