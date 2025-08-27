// src/hooks/useRecipes.ts
import { useState, useEffect } from 'react';
import { Recipe, MealLog } from '../data/recipes';
import { recipeService, mealLogService } from '../services/recipeService';
import { toast } from 'sonner';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [recipesData, mealLogsData] = await Promise.all([
        recipeService.getAllRecipes(),
        mealLogService.getAllMealLogs()
      ]);
      
      setRecipes(recipesData);
      setMealLogs(mealLogsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      toast.error('Failed to load data from Firebase');
    } finally {
      setLoading(false);
    }
  };

  // Recipe operations
  const addRecipe = async (recipeData: Omit<Recipe, 'id' | 'dateAdded'>) => {
    try {
      const id = await recipeService.addRecipe({
        ...recipeData,
        dateAdded: new Date().toISOString().split('T')[0]
      });
      
      const newRecipe: Recipe = {
        ...recipeData,
        id,
        dateAdded: new Date().toISOString().split('T')[0]
      };
      
      setRecipes(prev => [newRecipe, ...prev]);
      toast.success(`${recipeData.name} has been added to your collection!`);
      return id;
    } catch (err) {
      toast.error('Failed to add recipe');
      throw err;
    }
  };

  const updateRecipe = async (id: string, recipeData: Partial<Recipe>) => {
    try {
      await recipeService.updateRecipe(id, recipeData);
      
      setRecipes(prev => prev.map(recipe => 
        recipe.id === id ? { ...recipe, ...recipeData } : recipe
      ));
      
      toast.success('Recipe has been updated!');
    } catch (err) {
      toast.error('Failed to update recipe');
      throw err;
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      await recipeService.deleteRecipe(id);
      
      const recipe = recipes.find(r => r.id === id);
      setRecipes(prev => prev.filter(r => r.id !== id));
      
      if (recipe) {
        toast.success(`${recipe.name} has been deleted`);
      }
    } catch (err) {
      toast.error('Failed to delete recipe');
      throw err;
    }
  };

  const updateLastMade = async (id: string, date: string) => {
    try {
      await recipeService.updateLastMade(id, date);
      
      setRecipes(prev => prev.map(recipe => 
        recipe.id === id ? { ...recipe, lastMade: date } : recipe
      ));
    } catch (err) {
      toast.error('Failed to update last made date');
      throw err;
    }
  };

  // Meal log operations
  const addMealLog = async (logData: Omit<MealLog, 'id'>) => {
    try {
      const id = await mealLogService.addMealLog(logData);
      
      const newLog: MealLog = {
        ...logData,
        id
      };
      
      setMealLogs(prev => [newLog, ...prev]);
      
      // Update recipe's lastMade date
      await updateLastMade(logData.recipeId, logData.date);
      
      const recipe = recipes.find(r => r.id === logData.recipeId);
      if (recipe) {
        toast.success(`Meal log saved for ${recipe.name}!`);
      }
      
      return id;
    } catch (err) {
      toast.error('Failed to save meal log');
      throw err;
    }
  };

  const updateMealLog = async (id: string, logData: Partial<MealLog>) => {
    try {
      await mealLogService.updateMealLog(id, logData);
      
      setMealLogs(prev => prev.map(log => 
        log.id === id ? { ...log, ...logData } : log
      ));
      
      toast.success('Meal log has been updated!');
    } catch (err) {
      toast.error('Failed to update meal log');
      throw err;
    }
  };

  const deleteMealLog = async (id: string) => {
    try {
      await mealLogService.deleteMealLog(id);
      
      setMealLogs(prev => prev.filter(log => log.id !== id));
      toast.success('Meal log has been deleted');
    } catch (err) {
      toast.error('Failed to delete meal log');
      throw err;
    }
  };

  return {
    // Data
    recipes,
    mealLogs,
    loading,
    error,
    
    // Recipe operations
    addRecipe,
    updateRecipe,
    deleteRecipe,
    updateLastMade,
    
    // Meal log operations
    addMealLog,
    updateMealLog,
    deleteMealLog,
    
    // Utility
    refetch: loadData
  };
};