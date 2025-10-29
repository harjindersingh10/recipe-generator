
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { RecipeInputForm } from './components/RecipeInputForm';
import { RecipeDisplay } from './components/RecipeDisplay';
import { Footer } from './components/Footer';
import { generateRecipe } from './services/geminiService';
import type { Recipe, RecipeRequest } from './types';

const App: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);

  // Create floating particles for background animation
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1
    }));
    setParticles(newParticles);
  }, []);

  const handleGenerateRecipe = useCallback(async (request: RecipeRequest) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const newRecipe = await generateRecipe(request);
      setRecipe(newRecipe);
    } catch (err) {
      console.error(err);
      setError('Failed to generate recipe. The AI might be busy, please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      <Header />
      
      {/* Split Screen Layout */}
      <main className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-hidden">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-lg mx-auto space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full border border-green-200">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-green-700 font-medium">AI Recipe Generator</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
                  MealWave
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Transform your ingredients into <span className="text-orange-600 font-semibold">delicious recipes</span>
                </p>
              </div>

              <RecipeInputForm onGenerate={handleGenerateRecipe} isLoading={isLoading} />
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="hidden lg:block w-px bg-gray-200"></div>
        
        {/* Right Panel - Recipe Output (Desktop) / Bottom Panel (Mobile) */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto">
            <RecipeDisplay recipe={recipe} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
