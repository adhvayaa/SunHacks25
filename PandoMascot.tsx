import React, { useState, useEffect } from 'react';
import pandaImage from 'figma:asset/b15521d08b381517bf297f3af9faf64845708092.png';

interface PandoMascotProps {
  className?: string;
  isExcited?: boolean;
}

export function PandoMascot({ className = "", isExcited = false }: PandoMascotProps) {
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2500);
    }, 7000);

    return () => {
      clearInterval(waveInterval);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className={`relative ${isExcited ? 'animate-panda-cheer' : 'animate-breathe'}`}>
        {/* Panda Image Container */}
        <div className="w-24 h-24 relative">
          
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-xl animate-glow"></div>
          
          {/* Main panda image with enhanced styling */}
          <div className={`relative w-full h-full rounded-full overflow-hidden shadow-2xl border-3 border-white bg-white transition-transform duration-300 ${isWaving ? 'animate-wave' : ''}`}>
            <img 
              src={pandaImage} 
              alt="Pando the Panda - EcoCart Mascot"
              className="w-full h-full object-cover scale-110"
            />
            
            {/* Overlay gradient for better integration */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-50/10 to-emerald-50/20 rounded-full"></div>
            
            {/* Cute sparkle overlay when excited */}
            {isExcited && (
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-transparent to-pink-200/30 rounded-full animate-pulse"></div>
            )}
          </div>
          
          {/* Enhanced floating eco elements */}
          <div className="absolute -top-6 -right-6 animate-float text-green-500 opacity-90 text-xl drop-shadow-lg">🌱</div>
          <div className="absolute top-4 -left-8 animate-float text-blue-500 opacity-90 text-xl drop-shadow-lg" style={{ animationDelay: '1.2s' }}>♻️</div>
          <div className="absolute bottom-2 -right-8 animate-float text-emerald-500 opacity-90 text-xl drop-shadow-lg" style={{ animationDelay: '2.4s' }}>🌍</div>
          
          {/* Premium celebration effects when excited */}
          {isExcited && (
            <>
              <div className="absolute -top-8 left-0 animate-sparkle text-yellow-400 text-2xl drop-shadow-lg">✨</div>
              <div className="absolute -top-6 right-0 animate-sparkle text-yellow-500 text-2xl drop-shadow-lg" style={{ animationDelay: '0.2s' }}>⭐</div>
              <div className="absolute top-0 -right-10 animate-sparkle text-yellow-400 text-2xl drop-shadow-lg" style={{ animationDelay: '0.4s' }}>🎉</div>
              <div className="absolute bottom-0 -left-10 animate-sparkle text-yellow-500 text-2xl drop-shadow-lg" style={{ animationDelay: '0.6s' }}>💫</div>
              <div className="absolute top-1/2 -left-12 animate-sparkle text-purple-400 text-xl drop-shadow-lg" style={{ animationDelay: '0.8s' }}>🌈</div>
              <div className="absolute top-1/4 -right-12 animate-sparkle text-pink-400 text-xl drop-shadow-lg" style={{ animationDelay: '1s' }}>💖</div>
            </>
          )}
          
          {/* Eco badge overlay */}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
            <span className="text-white text-sm">🌿</span>
          </div>
        </div>
      </div>
    </div>
  );
}
