import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Package, Globe, Recycle, Clock, Sparkles } from 'lucide-react';

interface ImpactData {
  packages: number;
  carbonReduced: number;
  wasteReduced: number;
  tip: string;
}

export function ImpactSection() {
  const [cartText, setCartText] = useState('');
  const [impactData, setImpactData] = useState<ImpactData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const analyzeCart = () => {
    if (!cartText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    setTimeout(() => {
      // Mock analysis based on cart text
      const lines = cartText.split('\n').filter(line => line.trim());
      const itemCount = lines.length;
      
      const mockData: ImpactData = {
        packages: Math.max(1, Math.ceil(itemCount / 3)),
        carbonReduced: Math.floor(Math.random() * 30) + 15,
        wasteReduced: Math.floor(Math.random() * 25) + 10,
        tip: "Delay non-urgent items for 2-3 days to consolidate shipments"
      };
      
      setImpactData(mockData);
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const CountUpNumber = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!showResults) return;
      
      let start = 0;
      const increment = value / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 50);

      return () => clearInterval(timer);
    }, [value, duration, showResults]);

    return <span className="animate-count-up">{displayValue}</span>;
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="mb-6 bg-gradient-to-r from-green-800 via-emerald-800 to-teal-800 bg-clip-text text-transparent drop-shadow-lg transform hover:scale-105 transition-transform duration-300 font-black">IMPACT AT A GLANCE</h2>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <Card className="border-green-200 shadow-lg animate-slide-in-up">
          <CardContent className="p-6">
            <div className="space-y-4">
              <label htmlFor="cart-input" className="block text-green-700">
                Paste the Pando suggestion:
              </label>
              <Textarea
                id="cart-input"
                value={cartText}
                onChange={(e) => setCartText(e.target.value)}
                placeholder="1x Organic cotton t-shirt
2x Bamboo toothbrush
1x Reusable water bottle
3x LED light bulbs
..."
                className="min-h-32 border-green-200 focus:border-green-400 focus:ring-green-400"
              />
              <Button
                onClick={analyzeCart}
                disabled={!cartText.trim() || isAnalyzing}
                className="w-full animate-glow bg-green-500 hover:bg-green-600"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing with EcoAI...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Environmental Impact
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && impactData && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            <Card className="border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-6 text-center">
                <Package className="mx-auto mb-3 h-8 w-8 text-green-600" />
                <div className="text-2xl text-green-700 mb-1">
                  <CountUpNumber value={impactData.packages} />
                </div>
                <p className="text-green-600">Packages</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 shadow-lg bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-6 text-center">
                <Globe className="mx-auto mb-3 h-8 w-8 text-blue-600" />
                <div className="text-2xl text-blue-700 mb-1">
                  <CountUpNumber value={impactData.carbonReduced} />%
                </div>
                <p className="text-blue-600">Carbon Reduced</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 shadow-lg bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-6 text-center">
                <Recycle className="mx-auto mb-3 h-8 w-8 text-purple-600" />
                <div className="text-2xl text-purple-700 mb-1">
                  <CountUpNumber value={impactData.wasteReduced} />%
                </div>
                <p className="text-purple-600">Waste Reduced</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 shadow-lg bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-6 text-center">
                <Clock className="mx-auto mb-3 h-8 w-8 text-orange-600" />
                <div className="text-orange-700 mb-1">💡</div>
                <p className="text-orange-600">Eco Tip</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tip Card */}
        {showResults && impactData && (
          <Card className="border-orange-200 shadow-lg bg-gradient-to-r from-orange-50 to-yellow-50 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-orange-800 mb-2">Smart Tip</h4>
                  <p className="text-orange-700">{impactData.tip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
