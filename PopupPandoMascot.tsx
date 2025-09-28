import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface PopupPandoMascotProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
  isExcited?: boolean;
}

export function PopupPandoMascot({ isVisible, onClose, message = "Hi there! I'm Pando, your eco-friendly shopping assistant! 🌱", isExcited = false }: PopupPandoMascotProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with animated gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className={`w-2 h-2 rounded-full ${
                i % 4 === 0 ? 'bg-green-400' : 
                i % 4 === 1 ? 'bg-blue-400' : 
                i % 4 === 2 ? 'bg-purple-400' : 'bg-yellow-400'
              } animate-sparkle`}></div>
            </div>
          ))}
        </div>

        {/* Drifting leaves */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float text-green-500 opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                fontSize: `${16 + Math.random() * 8}px`,
              }}
            >
              🍃
            </div>
          ))}
        </div>
      </div>

      {/* Main popup container */}
      <div 
        className={`relative bg-white rounded-3xl shadow-2xl border-4 border-green-200 max-w-md mx-4 overflow-hidden ${
          isAnimating ? 'animate-bounce' : ''
        }`}
        style={{
          animation: isAnimating ? 'popupBounce 0.8s ease-out' : undefined
        }}
      >
        {/* Colorful header gradient */}
        <div className="h-4 bg-gradient-to-r from-green-400 via-blue-500 via-purple-500 to-pink-500"></div>
        
        {/* Close button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-6 right-4 z-10 hover:bg-gray-100 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Content */}
        <div className="p-8 text-center bg-gradient-to-br from-white via-green-50 to-blue-50">
          {/* Enhanced Panda Design */}
          <div className={`relative mx-auto mb-6 ${isExcited ? 'animate-panda-cheer' : 'animate-breathe'}`}>
            <div className="w-32 h-36 relative">
              {/* Main body with enhanced gradient */}
              <div className="w-28 h-32 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-3xl relative shadow-2xl border-2 border-gray-200">
                
                {/* Head with better proportions */}
                <div className="w-24 h-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-3xl absolute -top-10 left-2 border-2 border-gray-200 shadow-xl">
                  
                  {/* Ears with enhanced depth */}
                  <div className="absolute -top-6 -left-3 w-9 h-9 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full shadow-lg"></div>
                  <div className="absolute -top-6 right-1 w-9 h-9 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full shadow-lg"></div>
                  
                  {/* Inner ears */}
                  <div className="absolute -top-5 -left-2 w-5 h-5 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full"></div>
                  <div className="absolute -top-5 right-2 w-5 h-5 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full"></div>
                  
                  {/* Eye patches with better shading */}
                  <div className="absolute top-4 left-1 w-8 h-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full shadow-md"></div>
                  <div className="absolute top-4 right-1 w-8 h-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full shadow-md"></div>
                  
                  {/* Eyes with enhanced shine and expressions */}
                  <div className="absolute top-5 left-2 w-5 h-5 bg-gray-900 rounded-full">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-90"></div>
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-60"></div>
                    {isExcited && <div className="absolute inset-0 bg-yellow-400 rounded-full animate-sparkle opacity-20"></div>}
                  </div>
                  <div className="absolute top-5 right-2 w-5 h-5 bg-gray-900 rounded-full">
                    <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-90"></div>
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-60"></div>
                    {isExcited && <div className="absolute inset-0 bg-yellow-400 rounded-full animate-sparkle opacity-20"></div>}
                  </div>
                  
                  {/* Nose with enhanced detail */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full shadow-sm"></div>
                  
                  {/* Happy smile */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-4 border-b-3 border-gray-700 rounded-b-xl"></div>
                    {isExcited && (
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-pink-300 rounded-full opacity-60"></div>
                    )}
                  </div>
                </div>
                
                {/* Arms with better positioning */}
                <div className={`absolute top-12 -left-4 w-8 h-14 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-full border-2 border-gray-200 shadow-lg ${isExcited ? 'animate-wave' : ''} origin-top`}></div>
                <div className="absolute top-12 -right-4 w-8 h-14 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-full border-2 border-gray-200 shadow-lg"></div>
                
                {/* Belly with eco pattern */}
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-18 h-18 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-full border-2 border-green-200 shadow-inner">
                  <div className="absolute inset-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-400 text-lg">🌱</div>
                </div>
                
                {/* Legs with better proportions */}
                <div className="absolute bottom-1 left-4 w-8 h-12 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-full border-2 border-gray-200 shadow-lg"></div>
                <div className="absolute bottom-1 right-4 w-8 h-12 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-full border-2 border-gray-200 shadow-lg"></div>
              </div>
              
              {/* Floating eco elements with enhanced animation */}
              <div className="absolute -top-8 -right-8 animate-float text-green-500 opacity-90 text-2xl">🌱</div>
              <div className="absolute top-6 -left-10 animate-float text-blue-500 opacity-90 text-2xl" style={{ animationDelay: '1s' }}>♻️</div>
              <div className="absolute bottom-4 -right-10 animate-float text-emerald-500 opacity-90 text-2xl" style={{ animationDelay: '2s' }}>🌍</div>
              
              {/* Celebration effects when excited */}
              {isExcited && (
                <>
                  <div className="absolute -top-12 left-0 animate-sparkle text-yellow-400 text-3xl">✨</div>
                  <div className="absolute -top-8 right-0 animate-sparkle text-yellow-400 text-3xl" style={{ animationDelay: '0.3s' }}>⭐</div>
                  <div className="absolute top-0 -right-12 animate-sparkle text-yellow-400 text-3xl" style={{ animationDelay: '0.6s' }}>🎉</div>
                  <div className="absolute bottom-0 -left-12 animate-sparkle text-yellow-400 text-3xl" style={{ animationDelay: '0.9s' }}>💫</div>
                </>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h3 className="text-2xl text-green-800 mb-2">Hey there! 👋</h3>
            <p className="text-green-700 text-lg leading-relaxed px-2">
              {message}
            </p>
            
            {/* Action button */}
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl animate-glow mt-6"
            >
              Let's Go Green! 🌱
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add custom animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes popupBounce {
    0% { transform: scale(0.3) translateY(-50px); opacity: 0; }
    50% { transform: scale(1.05) translateY(-10px); opacity: 0.8; }
    70% { transform: scale(0.95) translateY(5px); opacity: 0.9; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
`;
document.head.appendChild(style);
