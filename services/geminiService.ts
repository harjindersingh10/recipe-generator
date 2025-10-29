
import { GoogleGenAI, Type } from '@google/genai';
import type { Recipe, RecipeRequest } from '../types';

const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: 'The name of the recipe.',
    },
    description: {
      type: Type.STRING,
      description: 'A brief, enticing description of the dish.',
    },
    prepTime: {
        type: Type.STRING,
        description: 'Estimated preparation time (e.g., "15 minutes").'
    },
    cookTime: {
        type: Type.STRING,
        description: 'Estimated cooking time (e.g., "30 minutes").'
    },
    servings: {
        type: Type.STRING,
        description: 'Number of servings this recipe makes (e.g., "4 servings").'
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: 'A list of ingredients with quantities.',
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: 'Step-by-step cooking instructions.',
    },
  },
  required: ['recipeName', 'description', 'prepTime', 'cookTime', 'servings', 'ingredients', 'instructions'],
};

export const generateRecipe = async (request: RecipeRequest): Promise<Recipe> => {
  const prompt = `
    Generate a creative and delicious recipe based on the following details.

    Available Ingredients: ${request.ingredients}
    Desired Cuisine: ${request.cuisine || 'Any'}
    Dietary Restrictions: ${request.dietaryRestrictions || 'None'}

    Please ensure the recipe is well-described and the instructions are clear.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: recipeSchema,
        temperature: 0.7,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedRecipe: Recipe = JSON.parse(jsonText);
    
    return parsedRecipe;

  } catch (error) {
    console.error('Error generating recipe with Gemini:', error);
    throw new Error('Failed to parse recipe from AI response.');
  }
};
