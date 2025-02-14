import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { FloatingHeart, Confetti, Sparkle } from './decorative';
import { LDR_QUOTES } from '../constants';

const AcceptedView = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Generate decorative elements
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      size: 20 + Math.random() * 20,
    }));
    setHearts(newHearts);

    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }));
    setConfetti(newConfetti);

    const newSparkles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${1 + Math.random() * 2}s`,
    }));
    setSparkles(newSparkles);

    // Create audio element
    const audio = new Audio('https://github.com/dynozilla/valentine/blob/main/public/music/skipandloafer.mp3');
    audio.loop = true;

    // Play audio when component mounts
    const playAudio = async () => {
      try {
        if (!isMuted) {
          await audio.play();
        }
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    };

    playAudio();

    // Cleanup
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-pink-50 overflow-hidden'>
      {/* Background decorations */}
      {hearts.map(heart => (
        <FloatingHeart
          key={heart.id}
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.animationDelay,
          }}
          size={heart.size}
        />
      ))}
      {confetti.map(conf => (
        <Confetti
          key={conf.id}
          style={{
            left: conf.left,
            top: conf.top,
            animationDelay: conf.animationDelay,
            animationDuration: conf.animationDuration,
          }}
        />
      ))}
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.animationDelay,
            animationDuration: sparkle.animationDuration,
          }}
        />
      ))}

      {/* Sound control button */}
      <button
        onClick={toggleMute}
        className='fixed top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200'
      >
        {isMuted ? <VolumeX className='text-gray-600' size={24} /> : <Volume2 className='text-gray-600' size={24} />}
      </button>

      {/* Central content */}
      <div className='relative'>
        <Heart className='text-red-500 animate-heartbeat' size={96} />
        <Sparkles className='absolute -top-6 -right-6 text-yellow-400 animate-spin-slow' size={32} />
        <Sparkles className='absolute -bottom-6 -left-6 text-yellow-400 animate-spin-slow' size={32} />
      </div>

      <h1 className='text-6xl font-bold text-red-500 text-center animate-celebration mt-8 mb-12'>
        Yay! Happy Valentine's Day! ❤️
      </h1>

      <div className='max-w-3xl mx-auto p-4 grid gap-4'>
        {LDR_QUOTES.map((quote, index) => (
          <div
            key={index}
            className='text-xl text-gray-700 italic text-center p-6 bg-white rounded-lg shadow-lg border-2 border-pink-200 
              transform hover:-translate-y-2 transition-all duration-300
              animate-fadeInSlide'
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <span className='inline-block animate-pulse-slow'>❤️</span>
            <span className='mx-2'>"{quote}"</span>
            <span className='inline-block animate-pulse-slow'>❤️</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcceptedView;
