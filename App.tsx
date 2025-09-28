import React, { useState, useEffect } from 'react';
import { PandoMascot } from './components/PandoMascot';
import { PopupPandoMascot } from './components/PopupPandoMascot';
import { ImpactSection } from './components/ImpactSection';
import { SmartSuggestions } from './components/SmartSuggestions';
import { EcoQuizChallenge } from './components/EcoQuizChallenge';
import { AnimatedBackground } from './components/AnimatedBackground';
import { EcoCartLogo } from './components/EcoCartLogo';

export default function App() {
  const [showPopupPanda, setShowPopupPanda] = useState(false);

  useEffect(() => {
    // Show popup panda after a short delay when app loads
    const timer = setTimeout(() => {
      setShowPopupPanda(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Sticky Panda Mascot */}
      <div className="fixed top-6 right-6 z-40">
        <PandoMascot className="animate-slide-in-left" />
      </div>

      {/* Popup Panda Mascot */}
      <PopupPandoMascot 
        isVisible={showPopupPanda}
        onClose={() => setShowPopupPanda(false)}
        message="Welcome to EcoCart! I'm Pando, your AI shopping assistant. Let's make your shopping more sustainable together! 🌱✨"
      />

      {/* Header */}
      <header className="relative z-10 text-center py-12 px-4">
        <div className="animate-slide-in-up max-w-6xl mx-auto">
          <EcoCartLogo />
          <p className="text-green-600 max-w-4xl mx-auto text-lg leading-relaxed mt-4">
            Transform your shopping into an eco-friendly adventure with Pando! 
            Discover sustainable alternatives, reduce your carbon footprint, and earn rewards for making planet-friendly choices.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 space-y-16 px-4">
        <ImpactSection />
        <SmartSuggestions />
        <EcoQuizChallenge />
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 mt-16 px-4">
        <div className="max-w-4xl mx-auto animate-slide-in-up">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-2xl animate-float">🌱</span>
            <p className="text-green-700 text-lg">Made with love for Planet Earth</p>
            <span className="text-2xl animate-float">🌱</span>
          </div>
          <p className="text-green-600 text-lg mb-6">
            Join thousands of eco-warriors making a difference, one purchase at a time.
          </p>
          <div className="flex justify-center space-x-8 text-green-500 text-2xl">
            <span className="animate-float">🌱</span>
            <span className="animate-float" style={{ animationDelay: '1s' }}>🌍</span>
            <span className="animate-float" style={{ animationDelay: '2s' }}>♻️</span>
            <span className="animate-float" style={{ animationDelay: '3s' }}>💚</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
