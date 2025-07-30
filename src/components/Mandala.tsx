import React from 'react';

interface MandalaProps {
  petalsEarned: number;
}

const Mandala = ({ petalsEarned }: MandalaProps) => {
  const basePetalClass = "transition-all duration-1000 ease-in-out";
  const unearnedClass = "fill-gray-600 stroke-gray-500";
  const earnedClass = "fill-yellow-400/70 stroke-yellow-300";

  // A more organic, stylized petal path
  const petalPath = "M100,100 C90,80 70,65 100,30 C130,65 110,80 100,100 Z";

  const petalTransforms = [
    "rotate(0 100 100)",
    "rotate(72 100 100)",
    "rotate(144 100 100)",
    "rotate(216 100 100)",
    "rotate(288 100 100)",
  ];

  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <g>
        {petalTransforms.map((transform, index) => (
          <path
            key={index}
            d={petalPath}
            transform={transform}
            className={`${basePetalClass} ${index < petalsEarned ? earnedClass : unearnedClass}`}
            strokeWidth="1.5"
            style={{ filter: index < petalsEarned ? 'url(#glow)' : 'none' }}
          />
        ))}
      </g>
      
      {/* Central element */}
      <circle 
        cx="100" 
        cy="100" 
        r="28" 
        className={`stroke-2 transition-all duration-1000 ${petalsEarned > 0 ? 'fill-yellow-500/50 stroke-yellow-300' : 'fill-gray-700 stroke-gray-500'}`} 
      />
      <circle 
        cx="100" 
        cy="100" 
        r="22" 
        className={`stroke-1 transition-all duration-1000 ${petalsEarned > 0 ? 'fill-yellow-400/70 stroke-yellow-200' : 'fill-gray-600 stroke-gray-500'}`} 
      />
    </svg>
  );
};

export default Mandala;