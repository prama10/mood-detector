import React from 'react';

const CameraControls = ({ onDetect, onStop, onCapture }) => (
  <div className="button-group">
    <button onClick={onDetect}>Detect Mood</button>
    <button className="secondary" onClick={onStop}>Reset</button>
    <button onClick={onCapture}>Save Selfie</button>
  </div>
);

export default CameraControls;
