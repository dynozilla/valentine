import React from 'react';
import { Heart, PartyPopper, Stars } from 'lucide-react';

export const FloatingHeart = ({ style, size = 24, color = 'text-red-300' }) => (
  <div className='absolute animate-float' style={style}>
    <Heart size={size} className={`${color} opacity-50`} />
  </div>
);

export const Confetti = ({ style }) => (
  <div className='absolute animate-confetti' style={style}>
    <PartyPopper size={20} className='text-pink-400' />
  </div>
);

export const Sparkle = ({ style }) => (
  <div className='absolute animate-sparkle' style={style}>
    <Stars size={16} className='text-yellow-400' />
  </div>
);
