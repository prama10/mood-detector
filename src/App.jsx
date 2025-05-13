import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import * as faceapi from 'face-api.js';
import Confetti from 'react-confetti';

const MoodDetector = () => {
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
    if (videoRef.current && videoRef.current.srcObject) {
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
      setTimeout(() => setEffectVisible(false), 5000);
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

    // Draw mood text (badge)
    context.font = '40px Arial';
    context.fillStyle = 'white';
    context.fillText(mood.toUpperCase(), 20, 40);

    // Save image as PNG
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `mood-badge-selfie-${Date.now()}.png`;
    link.click();
  };

  const renderEffect = () => {
    if (!effectVisible) return null;

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

  return (
    <div className="app">
      <h1>Mood Detector 🎭</h1>

      {!isCameraOn ? (
        <button onClick={startCamera}>Start Camera</button>
      ) : (
        <>
          <div className="video-controls">
            <video ref={videoRef} autoPlay muted width="360" height="270" />
            <div className="button-group">
              <button onClick={analyzeMood}>Detect Mood</button>
              <button className="secondary" onClick={stopCamera}>Reset</button>
              <button onClick={captureSelfie}>Save Selfie</button>
            </div>
          </div>

          {mood && (
            <div className="mood-display">
              <p>Detected Mood: <strong>{mood}</strong></p>
            </div>
          )}
        </>
      )}

      {renderEffect()}

      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default MoodDetector;
