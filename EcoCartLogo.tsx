import React from 'react';
import { Leaf } from 'lucide-react';

export function EcoCartLogo() {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      {/* Logo Icon */}
      <div className="relative mb-4">
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden animate-breathe">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-emerald-300/20 to-transparent"></div>
          
          {/* Main cart icon with leaf */}
          <div className="relative z-10">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-white drop-shadow-lg">
              <path 
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* Floating leaf accent */}
          <Leaf className="absolute -top-2 -right-2 h-7 w-7 text-green-200 animate-float drop-shadow-md" />
        </div>
        
        {/* Enhanced glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-xl opacity-40 animate-glow"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-teal-500 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
      </div>
      
      {/* Logo Text */}
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 drop-shadow-sm animate-glow" style={{ fontSize: '5.5rem', fontWeight: '800' }}>
          EcoCart
        </h1>
        <p className="text-green-600 text-lg font-medium bg-green-50 px-4 py-2 rounded-full border border-green-200 shadow-sm">
          🐼 Powered by Pando AI
        </p>
      </div>
    </div>
  );
}
