import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import * as faceapi from 'face-api.js';
import CameraControls from './components/CameraControls';
import MoodDisplay from './components/MoodDisplay';
import MoodEffects from './components/MoodEffects';
import EmojiParade from './components/EmojiParade';
import moodEmojis from './utils/moodEmojis';

const App = () => {
  const [mood, setMood] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [effectVisible, setEffectVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    };
    loadModels();
  }, []);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isCameraOn && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error('Webcam error:', err));
    }
  }, [isCameraOn]);

  const startCamera = () => setIsCameraOn(true);

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setMood('');
    setEffectVisible(false);
    setIsCameraOn(false);
  };

  const analyzeMood = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current)
      .withFaceExpressions();

    if (detections.length > 0) {
      const sorted = detections[0].expressions.asSortedArray();
      const moodDetected = sorted[0].expression;
      setMood(moodDetected);
      setEffectVisible(true);
      setTimeout(() => setEffectVisible(false), 6000);
    } else {
      setMood('No face found');
      setEffectVisible(false);
    }
  };

  const captureSelfie = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    context.font = '40px Comic Sans MS';
    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.fillText(mood.toUpperCase(), 20, 40);

    // Add emoji stamp
    context.font = '48px serif';
    context.fillText('📸 ' + (moodEmojis[mood]?.[0] || '🤔'), canvas.width - 100, canvas.height - 30);

    // Draw border
    context.strokeStyle = 'white';
    context.lineWidth = 20;
    context.strokeRect(0, 0, canvas.width, canvas.height);


    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `mood-badge-selfie-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="app">
      <h1>Mood Detector 🎭</h1>

      {!isCameraOn ? (
        <button onClick={startCamera}>Start Camera</button>
      ) : (
        <>
          <div className="video-controls">
            <video ref={videoRef} autoPlay muted width="360" height="270" />
            <CameraControls
              onDetect={analyzeMood}
              onStop={stopCamera}
              onCapture={captureSelfie}
            />
          </div>

          {mood && <MoodDisplay mood={mood} />}
          {effectVisible && <EmojiParade mood={mood} />}
        </>
      )}

      <MoodEffects mood={mood} visible={effectVisible} windowSize={windowSize} />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default App;
