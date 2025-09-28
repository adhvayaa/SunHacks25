import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle, X, Flame, Trophy, Brain, Sparkles } from 'lucide-react';
import { PandoMascot } from './PandoMascot';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface StreakBadge {
  id: string;
  name: string;
  days: number;
  icon: string;
  earned: boolean;
}

export function EcoQuizChallenge() {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(12);
  const [totalPoints, setTotalPoints] = useState(340);
  const [pandaExcited, setPandaExcited] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const [streakBadges, setStreakBadges] = useState<StreakBadge[]>([
    { id: '1', name: 'Eco Rookie', days: 3, icon: '🌱', earned: true },
    { id: '2', name: 'Green Warrior', days: 7, icon: '⚡', earned: true },
    { id: '3', name: 'Eco Master', days: 30, icon: '👑', earned: false },
    { id: '4', name: 'Planet Hero', days: 100, icon: '🌟', earned: false },
  ]);

  const quizQuestions: QuizQuestion[] = [
    {
      id: '1',
      question: "According to Amazon's recycling policy, which packaging material is NOT accepted in their recycling program?",
      options: [
        "Cardboard boxes with tape",
        "Plastic air pillows",
        "Bubble wrap with adhesive labels",
        "Paper padded envelopes"
      ],
      correctAnswer: 2,
      explanation: "Bubble wrap with adhesive labels cannot be recycled through Amazon's program because the labels contaminate the recycling process. Remove labels first!",
      points: 25
    },
    {
      id: '2',
      question: "What percentage of Amazon's packaging is made from recyclable materials as of 2024?",
      options: ["75%", "85%", "95%", "100%"],
      correctAnswer: 2,
      explanation: "Amazon has achieved 95% recyclable packaging materials and aims for 100% by 2025 as part of their Climate Pledge commitment.",
      points: 25
    },
    {
      id: '3',
      question: "Which Amazon program helps identify eco-friendly products?",
      options: [
        "Amazon Green",
        "Climate Pledge Friendly",
        "Eco Choice",
        "Sustainable Select"
      ],
      correctAnswer: 1,
      explanation: "Climate Pledge Friendly helps customers discover and shop for more sustainable products with certifications like ENERGY STAR and EPEAT.",
      points: 25
    },
    {
      id: '4',
      question: "Amazon's 'Right-Sized Packaging' initiative has eliminated how many tons of packaging material?",
      options: ["500,000 tons", "750,000 tons", "1 million tons", "1.5 million tons"],
      correctAnswer: 2,
      explanation: "Amazon's machine learning algorithms for right-sized packaging have eliminated over 1 million tons of packaging material since 2015.",
      points: 30
    }
  ];

  useEffect(() => {
    // Load a random question on component mount
    const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    setCurrentQuestion(randomQuestion);
  }, []);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setStreak(prev => prev + 1);
      setTotalPoints(prev => prev + currentQuestion.points);
      setPandaExcited(true);
      setShowCelebration(true);
      
      // Check for new badges
      setStreakBadges(prev => prev.map(badge => ({
        ...badge,
        earned: badge.earned || streak + 1 >= badge.days
      })));

      setTimeout(() => {
        setPandaExcited(false);
        setShowCelebration(false);
      }, 3000);
    }
  };

  const getNextQuestion = () => {
    const availableQuestions = quizQuestions.filter(q => q.id !== currentQuestion?.id);
    const nextQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    
    setCurrentQuestion(nextQuestion);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getStreakColor = () => {
    if (streak >= 30) return 'text-purple-500';
    if (streak >= 7) return 'text-orange-500';
    if (streak >= 3) return 'text-green-500';
    return 'text-gray-500';
  };

  const getStreakMessage = () => {
    if (streak >= 30) return "Eco Master! 🏆";
    if (streak >= 7) return "On fire! 🔥";
    if (streak >= 3) return "Great start! 🌱";
    return "Keep going! 💪";
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-0 relative">
      {/* Floating celebration effects */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-20">
          <div className="absolute top-1/4 left-1/4 animate-sparkle text-4xl">🎉</div>
          <div className="absolute top-1/3 right-1/4 animate-sparkle text-4xl" style={{ animationDelay: '0.3s' }}>✨</div>
          <div className="absolute bottom-1/3 left-1/3 animate-sparkle text-4xl" style={{ animationDelay: '0.6s' }}>🌟</div>
        </div>
      )}

      <div className="text-center mb-10">
        <h2 className="mb-6 bg-gradient-to-r from-green-800 via-emerald-800 to-teal-800 bg-clip-text text-transparent drop-shadow-lg transform hover:scale-105 transition-transform duration-300 font-black">DAILY ECO CHALLENGE</h2>
        <p className="text-green-600 max-w-2xl mx-auto text-lg">
          Test your knowledge about Amazon's sustainability policies and eco-friendly practices!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Quiz Card */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-gradient-to-r from-green-300 to-emerald-300 shadow-2xl animate-slide-in-up bg-gradient-to-br from-white via-green-50 to-emerald-50 overflow-hidden">
            {/* Decorative header */}
            <div className="h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"></div>
            
            <CardContent className="p-8">
              {currentQuestion && (
                <div className="space-y-8">
                  {/* Question Header with enhanced styling */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-sm px-4 py-2">
                      <Brain className="h-4 w-4 mr-2" />
                      +{currentQuestion.points} Points
                    </Badge>
                    <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm border border-orange-200">
                      <Flame className={`h-7 w-7 ${getStreakColor()} drop-shadow-sm`} />
                      <span className={`${getStreakColor()} font-bold text-lg`}>{streak}</span>
                      <span className="text-gray-600">day streak</span>
                    </div>
                  </div>

                  {/* Question with enhanced design */}
                  <div className="p-6 bg-gradient-to-br from-white to-green-50 rounded-2xl border-2 border-green-200 shadow-lg">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl">🤔</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-green-800 text-xl leading-relaxed">{currentQuestion.question}</h3>
                      </div>
                    </div>
                    
                    {/* Enhanced Answer Options */}
                    <div className="space-y-4">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => !showResult && setSelectedAnswer(index)}
                          disabled={showResult}
                          className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
                            showResult
                              ? index === currentQuestion.correctAnswer
                                ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 shadow-green-200 scale-105'
                                : index === selectedAnswer && !isCorrect
                                ? 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 text-red-800 shadow-red-200'
                                : 'border-gray-200 bg-gray-50 text-gray-600'
                              : selectedAnswer === index
                              ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 shadow-md scale-105'
                              : 'border-gray-200 bg-white hover:border-green-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:scale-102'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswer === index ? 'border-green-500 bg-green-500' : 'border-gray-300'
                              }`}>
                                {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                              </div>
                              <span className="text-lg">{option}</span>
                            </div>
                            {showResult && index === currentQuestion.correctAnswer && (
                              <CheckCircle className="h-6 w-6 text-green-600 animate-bounce" />
                            )}
                            {showResult && index === selectedAnswer && !isCorrect && (
                              <X className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Submit/Next Button */}
                  <div className="flex justify-center">
                    {!showResult ? (
                      <Button
                        onClick={handleAnswerSubmit}
                        disabled={selectedAnswer === null}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 text-lg shadow-lg hover:shadow-xl animate-glow"
                      >
                        <Sparkles className="mr-3 h-5 w-5" />
                        Submit Answer
                      </Button>
                    ) : (
                      <Button
                        onClick={getNextQuestion}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 text-lg shadow-lg hover:shadow-xl"
                      >
                        Next Challenge →
                      </Button>
                    )}
                  </div>

                  {/* Enhanced Result Explanation */}
                  {showResult && (
                    <div className={`p-6 rounded-2xl border-2 animate-slide-in-up shadow-lg ${
                      isCorrect 
                        ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50' 
                        : 'border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50'
                    }`}>
                      <div className="flex items-start space-x-4">
                        {isCorrect ? (
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                            <Brain className="h-6 w-6 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className={`text-xl mb-3 ${
                            isCorrect ? 'text-green-800' : 'text-orange-800'
                          }`}>
                            {isCorrect ? '🎉 Correct! Well done!' : '🤓 Not quite, but great try!'}
                          </h4>
                          <p className={`text-lg leading-relaxed ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                            {currentQuestion.explanation}
                          </p>
                          {isCorrect && (
                            <div className="mt-4 p-3 bg-white rounded-lg border border-green-200 shadow-sm">
                              <p className="text-green-600 font-semibold flex items-center">
                                <Sparkles className="mr-2 h-4 w-4" />
                                +{currentQuestion.points} points added to your score!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Panda Mascot */}
          <Card className="border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <PandoMascot isExcited={pandaExcited} className="mx-auto mb-4" />
              <p className="text-green-700 mb-2">Pando is cheering you on!</p>
              <p className="text-green-600 text-sm">{getStreakMessage()}</p>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="border-purple-200 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <h4 className="text-purple-800 mb-4 text-center">Your Progress</h4>
              
              <div className="space-y-4">
                {/* Points */}
                <div className="text-center">
                  <p className="text-2xl text-purple-700 mb-1">{totalPoints}</p>
                  <p className="text-purple-600">Total Points</p>
                  <Progress value={(totalPoints % 500) / 5} className="mt-2 h-2 bg-purple-100" />
                  <p className="text-purple-500 text-xs mt-1">
                    {500 - (totalPoints % 500)} to next reward
                  </p>
                </div>

                {/* Streak */}
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Flame className={`h-6 w-6 ${getStreakColor()}`} />
                    <span className="text-xl text-purple-700">{streak}</span>
                  </div>
                  <p className="text-purple-600">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="border-yellow-200 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <h4 className="text-yellow-800 mb-4 text-center">Achievement Badges</h4>
              <div className="grid grid-cols-2 gap-3">
                {streakBadges.map((badge, index) => (
                  <div
                    key={badge.id}
                    className={`text-center p-3 rounded-lg border-2 transition-all duration-300 ${
                      badge.earned
                        ? 'border-yellow-300 bg-yellow-100 animate-celebrate'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`text-2xl mb-1 ${badge.earned ? 'animate-bounce' : ''}`}>
                      {badge.icon}
                    </div>
                    <p className={`text-xs ${badge.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                      {badge.name}
                    </p>
                    <p className={`text-xs ${badge.earned ? 'text-yellow-600' : 'text-gray-500'}`}>
                      {badge.days} days
                    </p>
                    {badge.earned && (
                      <Trophy className="h-3 w-3 text-yellow-600 mx-auto mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
