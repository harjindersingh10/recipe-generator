
import React, { useState } from 'react';
import type { RecipeRequest } from '../types';
import { Spinner } from './Spinner';

interface RecipeInputFormProps {
  onGenerate: (request: RecipeRequest) => void;
  isLoading: boolean;
}

const cuisineOptions = ['Italian', 'Mexican', 'Thai', 'Indian', 'Chinese', 'Japanese', 'Mediterranean', 'French', 'American'];
const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Low-Carb', 'Dairy-Free'];

export const RecipeInputForm: React.FC<RecipeInputFormProps> = ({ onGenerate, isLoading }) => {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [showCuisineDropdown, setShowCuisineDropdown] = useState(false);
  const [showDietaryDropdown, setShowDietaryDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      alert('Please enter at least one ingredient.');
      return;
    }
    onGenerate({ ingredients, cuisine, dietaryRestrictions });
  };

  const inputStyles = "w-full p-4 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 placeholder-gray-400 text-gray-800";
  const labelStyles = "block mb-3 text-sm font-semibold text-gray-700 flex items-center gap-2";

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden">
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Create Your Recipe</h2>
          <p className="text-sm text-gray-600">Tell us what you have</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="ingredients" className={labelStyles}>
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              What ingredients do you have?
            </label>
            <input
              id="ingredients"
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="chicken breast, tomatoes, rice, garlic, onions..."
              className={inputStyles}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-2">
              Separate ingredients with commas for best results
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="cuisine" className={labelStyles}>
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Cuisine Style
              </label>
              <input
                id="cuisine"
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Italian, Mexican, Thai..."
                className={inputStyles}
                disabled={isLoading}
              />
            </div>
            
            <div className="relative">
              <label htmlFor="dietary" className={labelStyles}>
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Dietary Preferences
              </label>
              <input
                id="dietary"
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="Vegetarian, Gluten-Free..."
                className={inputStyles}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !ingredients.trim()}
          className="w-full flex justify-center items-center gap-2 py-3 px-6 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Spinner className="w-5 h-5" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span>Generate Recipe</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
