import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ArrowRight, Leaf, TrendingDown, Star, Search, Package } from 'lucide-react';

interface SuggestionItem {
  original: string;
  sustainable: string;
  carbonSaving: number;
  reason: string;
  rating: number;
  amazonRecyclePolicy: string;
  priceComparison: string;
}

export function SmartSuggestions() {
  const [itemInput, setItemInput] = useState('');
  const [suggestion, setSuggestion] = useState<SuggestionItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getEcoAlternative = (item: string): SuggestionItem => {
    const alternatives: { [key: string]: SuggestionItem } = {
      'water bottle': {
        original: item,
        sustainable: "HYDRO FLASK 32oz Stainless Steel Water Bottle",
        carbonSaving: 85,
        reason: "Eliminates 1,500+ single-use bottles per year. Amazon's packaging uses 100% recyclable materials.",
        rating: 5,
        amazonRecyclePolicy: "Amazon partners with TerraCycle for bottle cap recycling. Free shipping with minimal packaging.",
        priceComparison: "$29.95 vs $156/year for disposable bottles"
      },
      'plastic bottles': {
        original: item,
        sustainable: "HYDRO FLASK 32oz Stainless Steel Water Bottle",
        carbonSaving: 85,
        reason: "Eliminates 1,500+ single-use bottles per year. Amazon's packaging uses 100% recyclable materials.",
        rating: 5,
        amazonRecyclePolicy: "Amazon partners with TerraCycle for bottle cap recycling. Free shipping with minimal packaging.",
        priceComparison: "$29.95 vs $156/year for disposable bottles"
      },
      't-shirt': {
        original: item,
        sustainable: "Bamboo Organic T-Shirt by Boody",
        carbonSaving: 60,
        reason: "Bamboo uses 70% less water than cotton. Amazon Climate Pledge Friendly certified.",
        rating: 4,
        amazonRecyclePolicy: "Textile recycling program available. Ships in recyclable mailer made from 100% recycled materials.",
        priceComparison: "$25 vs $15 for regular cotton (but lasts 3x longer)"
      },
      'light bulb': {
        original: item,
        sustainable: "Philips LED Smart Bulbs (4-pack)",
        carbonSaving: 80,
        reason: "Uses 85% less energy, lasts 25x longer. Amazon's Certified for Humans program.",
        rating: 5,
        amazonRecyclePolicy: "LED recycling through Amazon's electronics trade-in program. Ships carbon-neutral.",
        priceComparison: "$32 vs $240 over bulb lifetime for incandescent"
      },
      'batteries': {
        original: item,
        sustainable: "Eneloop Rechargeable Batteries + Charger",
        carbonSaving: 75,
        reason: "Can be recharged 2,100 times. Amazon's battery recycling program removes toxic waste.",
        rating: 5,
        amazonRecyclePolicy: "Free battery collection at Amazon Fresh/Whole Foods. Ships in frustration-free packaging.",
        priceComparison: "$28 vs $420 over battery lifetime for disposable"
      }
    };

    // Find best match
    const key = Object.keys(alternatives).find(k => 
      item.toLowerCase().includes(k) || k.includes(item.toLowerCase())
    );
    
    return key ? alternatives[key] : {
      original: item,
      sustainable: "Eco-Friendly Alternative Available",
      carbonSaving: 45,
      reason: "Amazon offers sustainable alternatives with Climate Pledge Friendly certification.",
      rating: 4,
      amazonRecyclePolicy: "Part of Amazon's commitment to net-zero carbon by 2040. Recyclable packaging.",
      priceComparison: "Typically 10-30% premium but saves money long-term"
    };
  };

  const findAlternative = () => {
    if (!itemInput.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const result = getEcoAlternative(itemInput.trim());
      setSuggestion(result);
      setIsLoading(false);
    }, 1500);
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-0">
      <div className="text-center mb-10">
        <h2 className="mb-6 bg-gradient-to-r from-green-800 via-emerald-800 to-teal-800 bg-clip-text text-transparent drop-shadow-lg transform hover:scale-105 transition-transform duration-300 font-black">SMART ECO SUGGESTIONS</h2>
        <p className="text-green-600 max-w-2xl mx-auto text-lg">
          Enter any item and get sustainable alternatives based on Amazon's recycling policies
        </p>
      </div>

      {/* Item Input */}
      <Card className="border-green-200 shadow-lg mb-6 animate-slide-in-up">
        <CardContent className="p-6">
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                placeholder="Enter any product (e.g., water bottle, t-shirt, batteries...)"
                className="border-green-200 focus:border-green-400 focus:ring-green-400"
                onKeyPress={(e) => e.key === 'Enter' && findAlternative()}
              />
            </div>
            <Button
              onClick={findAlternative}
              disabled={!itemInput.trim() || isLoading}
              className="bg-green-500 hover:bg-green-600 animate-glow"
            >
              {isLoading ? (
                <>
                  <Package className="mr-2 h-4 w-4 animate-spin" />
                  Finding...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find Eco Alternative
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suggestion Result */}
      {suggestion && (
        <Card className="border-green-200 shadow-lg animate-slide-in-up bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 items-center mb-6">
              {/* Original Item */}
              <div className="text-center">
                <p className="text-gray-600 mb-2">Your Item</p>
                <p className="text-red-700 p-3 bg-red-50 rounded-lg border border-red-200">{suggestion.original}</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-green-500" />
              </div>

              {/* Sustainable Alternative */}
              <div className="text-center">
                <p className="text-gray-600 mb-2">Amazon Eco Alternative</p>
                <p className="text-green-700 p-3 bg-green-50 rounded-lg border border-green-200">{suggestion.sustainable}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <TrendingDown className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl text-blue-700 mb-1">{suggestion.carbonSaving}%</p>
                <p className="text-blue-600">Less CO₂</p>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="mb-2"><StarRating rating={suggestion.rating} /></div>
                <p className="text-yellow-700">{suggestion.rating}/5 Stars</p>
                <p className="text-yellow-600">Customer Rating</p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Package className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-green-700">Climate Pledge</p>
                <p className="text-green-600">Friendly ✓</p>
              </div>
            </div>

            {/* Details Toggle */}
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              className="w-full mb-4 border-green-200 hover:bg-green-50"
            >
              {isExpanded ? 'Hide Details' : 'Show Amazon Recycling Policy & Pricing'}
            </Button>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="space-y-4 animate-slide-in-up">
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <h4 className="text-green-800 mb-2 flex items-center">
                    <Leaf className="h-5 w-5 mr-2" />
                    Why This Alternative Works
                  </h4>
                  <p className="text-green-700">{suggestion.reason}</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-blue-800 mb-2">Amazon Recycling Policy</h4>
                  <p className="text-blue-700">{suggestion.amazonRecyclePolicy}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="text-purple-800 mb-2">Price Comparison</h4>
                  <p className="text-purple-700">{suggestion.priceComparison}</p>
                </div>

                <div className="flex justify-center">
                  <Button 
                    className="bg-green-500 hover:bg-green-600 animate-glow"
                    onClick={() => window.open('https://www.amazon.com/', '_blank')}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    View on Amazon
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </section>
  );
}
