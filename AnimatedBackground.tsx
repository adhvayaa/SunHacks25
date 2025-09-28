import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Forest Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Floating Leaves */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            <div
              className={`text-green-500 ${
                i % 4 === 0 ? 'text-xl' : i % 4 === 1 ? 'text-lg' : i % 4 === 2 ? 'text-base' : 'text-sm'
              }`}
            >
              🍃
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Light rays effect */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-200 to-transparent opacity-20 animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-yellow-200 to-transparent opacity-20 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
    </div>
  );
}
