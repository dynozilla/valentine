import React, { useState, useEffect } from 'react';
import { Heart, Angry } from 'lucide-react';
import { FloatingHeart } from './components/decorative';
import AcceptedView from './components/AcceptedView';
import { MESSAGES } from './constants';
import './animations.css';

const ValentineProposal = () => {
  const [position, setPosition] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [hoverCount, setHoverCount] = useState(0);
  const [message, setMessage] = useState(MESSAGES[0]);

  useEffect(() => {
    // Create floating hearts for the proposal view
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      size: 20 + Math.random() * 20,
    }));
    setHearts(newHearts);

    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.margin = '';
      document.body.style.overflow = '';
    };
  }, []);

  const handleNoHover = () => {
    setIsHovering(true);
    setHoverCount(prev => {
      const newCount = prev + 1;
      setMessage(MESSAGES[Math.min(newCount, MESSAGES.length - 1)]);
      return newCount;
    });

    const buttonWidth = 120;
    const buttonHeight = 60;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const maxX = viewportWidth - buttonWidth - 20;
    const maxY = viewportHeight - buttonHeight - 20;

    // More erratic movement as hover count increases
    const randomMove = () => {
      const intensity = Math.min(hoverCount / 2, 5);
      return (Math.random() - 0.5) * 2 * intensity;
    };

    let newX, newY;
    do {
      newX = Math.max(20, Math.min(maxX, Math.random() * maxX + randomMove() * 50));
      newY = Math.max(20, Math.min(maxY, Math.random() * maxY + randomMove() * 50));
    } while (position && Math.abs(newX - position.x) < 100 && Math.abs(newY - position.y) < 100);

    setPosition({ x: newX, y: newY });
  };

  const getNoButtonClasses = () => {
    const baseClasses = 'text-white px-12 py-6 rounded-xl text-2xl font-bold hover:bg-red-600 fixed';
    const animationClasses = [
      'animate-none',
      'animate-wiggle',
      'animate-bounce',
      'animate-shake',
      'animate-bounce-shake',
      'animate-rage',
      'animate-super-rage',
      'animate-ultra-rage',
      'animate-mega-rage',
      'animate-final-rage',
    ];

    const animationIndex = Math.min(hoverCount, animationClasses.length - 1);
    return `${baseClasses} ${animationClasses[animationIndex]}`;
  };

  if (accepted) {
    return <AcceptedView />;
  }

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-pink-50 overflow-hidden'>
      {hearts.map(heart => (
        <FloatingHeart
          key={heart.id}
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.animationDelay,
          }}
        />
      ))}

      <h1
        className={`text-6xl font-bold text-red-500 text-center mb-16 px-4 transition-all duration-300 
        ${hoverCount > 5 ? 'animate-shake' : ''}`}
      >
        {message}
      </h1>
      <div className='flex items-center justify-center gap-16 relative'>
        <button
          onClick={() => setAccepted(true)}
          className={`bg-green-500 text-white px-12 py-6 rounded-xl text-2xl font-bold transition-all duration-300 hover:bg-green-600 hover:shadow-lg ${
            isHovering ? 'scale-125' : 'scale-100'
          } ${hoverCount > 3 ? 'animate-pulse' : ''}`}
        >
          Yes
        </button>
        <button
          onMouseEnter={handleNoHover}
          className={`bg-red-500 ${getNoButtonClasses()}`}
          style={
            position
              ? {
                  left: position.x,
                  top: position.y,
                  transition: `all ${Math.max(0.1, 0.3 - hoverCount * 0.02)}s ease`,
                  zIndex: 50,
                }
              : {
                  position: 'relative',
                }
          }
        >
          No
          {hoverCount > 5 && <Angry className='absolute -top-4 -right-4 text-red-600 animate-bounce' />}
        </button>
      </div>
    </div>
  );
};

export default ValentineProposal;
