// src/services/recipeService.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Recipe, MealLog } from '../data/recipes';

const RECIPES_COLLECTION = 'recipes';
const MEAL_LOGS_COLLECTION = 'mealLogs';

// Recipe CRUD Operations
export const recipeService = {
  // Get all recipes
  async getAllRecipes(): Promise<Recipe[]> {
    try {
      const recipesQuery = query(
        collection(db, RECIPES_COLLECTION), 
        orderBy('dateAdded', 'desc')
      );
      const snapshot = await getDocs(recipesQuery);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Recipe[];
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw new Error('Failed to fetch recipes');
    }
  },

  // Add a new recipe
  async addRecipe(recipeData: Omit<Recipe, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, RECIPES_COLLECTION), {
        ...recipeData,
        dateAdded: new Date().toISOString().split('T')[0],
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw new Error('Failed to add recipe');
    }
  },

  // Update an existing recipe
  async updateRecipe(id: string, recipeData: Partial<Recipe>): Promise<void> {
    try {
      const recipeRef = doc(db, RECIPES_COLLECTION, id);
      await updateDoc(recipeRef, {
        ...recipeData,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw new Error('Failed to update recipe');
    }
  },

  // Delete a recipe
  async deleteRecipe(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, RECIPES_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw new Error('Failed to delete recipe');
    }
  },

  // Update last made date
  async updateLastMade(id: string, date: string): Promise<void> {
    try {
      const recipeRef = doc(db, RECIPES_COLLECTION, id);
      await updateDoc(recipeRef, {
        lastMade: date,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating last made date:', error);
      throw new Error('Failed to update last made date');
    }
  }
};

// Meal Log CRUD Operations
export const mealLogService = {
  // Get all meal logs
  async getAllMealLogs(): Promise<MealLog[]> {
    try {
      const logsQuery = query(
        collection(db, MEAL_LOGS_COLLECTION), 
        orderBy('date', 'desc')
      );
      const snapshot = await getDocs(logsQuery);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MealLog[];
    } catch (error) {
      console.error('Error fetching meal logs:', error);
      throw new Error('Failed to fetch meal logs');
    }
  },

  // Add a new meal log
  async addMealLog(logData: Omit<MealLog, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, MEAL_LOGS_COLLECTION), {
        ...logData,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding meal log:', error);
      throw new Error('Failed to add meal log');
    }
  },

  // Update an existing meal log
  async updateMealLog(id: string, logData: Partial<MealLog>): Promise<void> {
    try {
      const logRef = doc(db, MEAL_LOGS_COLLECTION, id);
      await updateDoc(logRef, {
        ...logData,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating meal log:', error);
      throw new Error('Failed to update meal log');
    }
  },

  // Delete a meal log
  async deleteMealLog(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, MEAL_LOGS_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting meal log:', error);
      throw new Error('Failed to delete meal log');
    }
  }
};