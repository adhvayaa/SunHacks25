import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Target, Flame, Trophy, Gift, CheckCircle, Star } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: string;
  icon: string;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

export function DailyGoals() {
  const [streak, setStreak] = useState(7);
  const [todayChallenge, setTodayChallenge] = useState<Challenge>({
    id: '1',
    title: "Package Consolidator",
    description: "Consolidate 5 items into 1 package",
    target: 5,
    current: 3,
    reward: "25 EcoPoints",
    icon: "📦"
  });

  const [badges, setBadges] = useState<Badge[]>([
    { id: '1', name: 'Eco Warrior', icon: '🌱', description: '7-day streak', earned: true },
    { id: '2', name: 'Carbon Crusher', icon: '💚', description: 'Reduced 50% emissions', earned: true },
    { id: '3', name: 'Waste Warrior', icon: '♻️', description: 'Diverted 10kg waste', earned: false },
    { id: '4', name: 'Planet Protector', icon: '🌍', description: '30-day streak', earned: false },
  ]);

  const [showCelebration, setShowCelebration] = useState(false);

  const completeChallenge = () => {
    if (todayChallenge.current < todayChallenge.target) {
      const newCurrent = Math.min(todayChallenge.current + 1, todayChallenge.target);
      setTodayChallenge(prev => ({ ...prev, current: newCurrent }));
      
      if (newCurrent === todayChallenge.target) {
        setStreak(prev => prev + 1);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  };

  const progressPercentage = (todayChallenge.current / todayChallenge.target) * 100;
  const isCompleted = todayChallenge.current >= todayChallenge.target;

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="mb-4 text-green-700">Daily Eco Goals</h2>
        <p className="text-green-600 max-w-2xl mx-auto">
          Complete daily challenges to build your eco-streak and earn rewards!
        </p>
      </div>

      <div className="space-y-6">
        {/* Today's Challenge */}
        <Card className={`border-green-200 shadow-lg animate-slide-in-up relative overflow-hidden ${
          isCompleted ? 'bg-gradient-to-r from-green-50 to-emerald-50' : ''
        }`}>
          {showCelebration && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 animate-pulse z-10 flex items-center justify-center">
              <div className="text-4xl animate-bounce">🎉</div>
            </div>
          )}
          
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{todayChallenge.icon}</div>
                <div>
                  <h3 className="text-green-800">{todayChallenge.title}</h3>
                  <p className="text-green-600">{todayChallenge.description}</p>
                </div>
              </div>
              <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                <Gift className="h-3 w-3 mr-1" />
                {todayChallenge.reward}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-green-700">Progress</span>
                <span className="text-green-700">
                  {todayChallenge.current}/{todayChallenge.target}
                </span>
              </div>
              
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-green-100"
              />
              
              <div className="flex justify-between items-center">
                <Button
                  onClick={completeChallenge}
                  disabled={isCompleted}
                  className={`${
                    isCompleted 
                      ? 'bg-green-600 text-white cursor-default' 
                      : 'bg-green-500 hover:bg-green-600 animate-glow'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Completed!
                    </>
                  ) : (
                    <>
                      <Target className="mr-2 h-4 w-4" />
                      Make Progress
                    </>
                  )}
                </Button>

                {isCompleted && (
                  <div className="flex items-center space-x-2 text-green-700 animate-slide-in-left">
                    <Trophy className="h-5 w-5" />
                    <span>+25 EcoPoints earned!</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak Counter */}
        <Card className="border-orange-200 shadow-lg bg-gradient-to-r from-orange-50 to-yellow-50 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-4">
              <div className="relative">
                <Flame className="h-12 w-12 text-orange-500 animate-breathe" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  {streak}
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-orange-800">Eco Streak</h3>
                <p className="text-orange-600">
                  {streak} days of sustainable choices!
                </p>
                <p className="text-orange-500 text-sm">
                  Keep it up to reach 30 days! 🔥
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="border-purple-200 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-6">
            <h3 className="text-purple-800 mb-4 text-center">Achievement Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={badge.id}
                  className={`text-center p-4 rounded-lg border-2 transition-all duration-300 ${
                    badge.earned
                      ? 'border-purple-300 bg-purple-100 animate-glow'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`text-3xl mb-2 ${badge.earned ? 'animate-bounce' : ''}`}>
                    {badge.icon}
                  </div>
                  <h4 className={`${badge.earned ? 'text-purple-800' : 'text-gray-600'} mb-1`}>
                    {badge.name}
                  </h4>
                  <p className={`text-xs ${badge.earned ? 'text-purple-600' : 'text-gray-500'}`}>
                    {badge.description}
                  </p>
                  {badge.earned && (
                    <div className="mt-2 flex justify-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Challenges Preview */}
        <Card className="border-blue-200 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-6">
            <h3 className="text-blue-800 mb-4 text-center">Upcoming Challenges</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl">🌿</div>
                <div>
                  <h4 className="text-blue-800">Carbon Calculator</h4>
                  <p className="text-blue-600 text-sm">Compare 3 product carbon footprints</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl">🚲</div>
                <div>
                  <h4 className="text-blue-800">Green Delivery</h4>
                  <p className="text-blue-600 text-sm">Choose eco-friendly shipping option</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
