
export interface RecipeRequest {
  ingredients: string;
  cuisine: string;
  dietaryRestrictions: string;
}

export interface Recipe {
  recipeName: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}
