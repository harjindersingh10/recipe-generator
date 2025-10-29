
import React, { useState } from 'react';
import type { Recipe } from '../types';
import { Spinner } from './Spinner';

interface RecipeDisplayProps {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingState = () => {
  const loadingMessages = [
    "Analyzing your ingredients...",
    "Consulting culinary experts...",
    "Crafting the perfect recipe...",
    "Adding the finishing touches..."
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-6">
          <Spinner className="w-16 h-16 mb-4" />
          <div className="flex justify-center space-x-1 mb-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        <p className="text-xl text-orange-600 font-bold mb-2">Creating Your Recipe</p>
        <p className="text-gray-600 transition-all duration-500">{loadingMessages[messageIndex]}</p>
        <div className="mt-6 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full animate-pulse" style={{ width: '70%' }} />
        </div>
      </div>
    </div>
  );
};

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-red-200 shadow-lg relative overflow-hidden">
    <div className="relative z-10">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-xl text-red-600 font-bold mb-2">Oops! Something went wrong</p>
      <p className="text-red-500 mb-6">{message}</p>
      <button className="px-6 py-2 bg-red-500 border border-red-500 rounded-lg text-white hover:bg-red-600 transition-colors">
        Try Again
      </button>
    </div>
  </div>
);

const InitialState = () => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border-2 border-dashed border-gray-300 relative overflow-hidden">
    <div className="relative z-10">
      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
        <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-xl text-gray-700 font-semibold mb-2">Ready to Cook Something Amazing?</p>
      <p className="text-gray-500">Enter your ingredients above and let AI create the perfect recipe for you!</p>
      <div className="flex justify-center gap-4 mt-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
          <span>Personalized</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span>Instant</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span>Delicious</span>
        </div>
      </div>
    </div>
  </div>
);

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  
  if (isLoading) {
    return <LoadingState />;
  }
  if (error) {
    return <ErrorState message={error} />;
  }
  if (!recipe) {
    return <InitialState />;
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden animate-fade-in h-full">
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Recipe Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full border border-green-200 mb-3">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xs text-green-700 font-medium">Recipe Ready!</span>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            {recipe.recipeName}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">{recipe.description}</p>
        </div>
        
        {/* Recipe Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-center">
            <p className="text-xs text-orange-600 font-bold uppercase">Prep</p>
            <p className="text-gray-800 text-sm font-semibold">{recipe.prepTime}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-center">
            <p className="text-xs text-blue-600 font-bold uppercase">Cook</p>
            <p className="text-gray-800 text-sm font-semibold">{recipe.cookTime}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-center">
            <p className="text-xs text-green-600 font-bold uppercase">Serves</p>
            <p className="text-gray-800 text-sm font-semibold">{recipe.servings}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-4">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ingredients'
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-200'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'instructions'
                  ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Instructions
            </button>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Ingredients */}
          <div className={activeTab === 'ingredients' ? 'block' : 'hidden'}>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold text-orange-600 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Ingredients
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Instructions */}
          <div className={activeTab === 'instructions' ? 'block' : 'hidden'}>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z" clipRule="evenodd" />
                </svg>
                Instructions
              </h3>
              <ol className="space-y-3">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
