import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { sampleRecipes, Recipe, MealLog } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import FilterBar from '@/components/FilterBar';
import MealLogModal from '@/components/MealLogModal';
import AddRecipeModal from '@/components/AddRecipeModal';
import { toast } from 'sonner';

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedPrepTime, setSelectedPrepTime] = useState('all');
  
  // Modal states
  const [isMealLogModalOpen, setIsMealLogModalOpen] = useState(false);
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);
  const [selectedRecipeForLog, setSelectedRecipeForLog] = useState<Recipe | null>(null);
  const [selectedRecipeForEdit, setSelectedRecipeForEdit] = useState<Recipe | null>(null);

  // Filter recipes based on search and filters
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
      
      const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
      
      const matchesPrepTime = selectedPrepTime === 'all' || 
        (selectedPrepTime === '15' && recipe.prepTime < 15) ||
        (selectedPrepTime === '30' && recipe.prepTime >= 15 && recipe.prepTime <= 30) ||
        (selectedPrepTime === '60' && recipe.prepTime > 30 && recipe.prepTime <= 60) ||
        (selectedPrepTime === '60+' && recipe.prepTime > 60);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrepTime;
    });
  }, [recipes, searchTerm, selectedCategory, selectedDifficulty, selectedPrepTime]);

  const handleEditRecipe = (recipe: Recipe) => {
    setSelectedRecipeForEdit(recipe);
    setIsAddRecipeModalOpen(true);
  };

  const handleDeleteRecipe = (id: string) => {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      setRecipes(recipes.filter(r => r.id !== id));
      toast.success(`${recipe.name} has been deleted`);
    }
  };

  const handleLogMeal = (recipe: Recipe) => {
    setSelectedRecipeForLog(recipe);
    setIsMealLogModalOpen(true);
  };

  const handleSaveMealLog = (logData: any) => {
    const newLog: MealLog = {
      id: Date.now().toString(),
      recipeId: logData.recipeId,
      date: logData.date,
      time: logData.time,
      photo: logData.photo,
      rating: logData.rating,
      notes: logData.notes,
      servingsMade: logData.servingsMade,
      whoAte: logData.whoAte,
      modifications: logData.modifications,
      wouldMakeAgain: logData.wouldMakeAgain
    };
    
    setMealLogs([...mealLogs, newLog]);
    
    // Update recipe's lastMade date
    setRecipes(recipes.map(recipe => 
      recipe.id === logData.recipeId 
        ? { ...recipe, lastMade: logData.date }
        : recipe
    ));
    
    toast.success(`Meal log saved for ${logData.recipeName}!`);
  };

  const handleSaveRecipe = (recipeData: Omit<Recipe, 'id' | 'dateAdded'>) => {
    if (selectedRecipeForEdit) {
      // Update existing recipe
      setRecipes(recipes.map(recipe => 
        recipe.id === selectedRecipeForEdit.id 
          ? { ...recipe, ...recipeData }
          : recipe
      ));
      toast.success(`${recipeData.name} has been updated!`);
    } else {
      // Add new recipe
      const newRecipe: Recipe = {
        ...recipeData,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setRecipes([...recipes, newRecipe]);
      toast.success(`${recipeData.name} has been added to your collection!`);
    }
    setSelectedRecipeForEdit(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-40 glassy-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Foodis</h1>
              <p className="text-gray-600 mt-1">Discover, save, and track your favorite recipes</p>
            </div>
            <Button 
              onClick={() => setIsAddRecipeModalOpen(true)}
              className="lovable-button text-white hover:shadow-lg transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Recipe
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedPrepTime={selectedPrepTime}
          onPrepTimeChange={setSelectedPrepTime}
        />

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={handleEditRecipe}
              onDelete={handleDeleteRecipe}
              onLogMeal={handleLogMeal}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedPrepTime !== 'all'
                ? 'Try adjusting your filters to see more recipes.'
                : 'Start building your recipe collection by adding your first recipe!'}
            </p>
            <Button 
              onClick={() => setIsAddRecipeModalOpen(true)}
              className="lovable-button text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Recipe
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-orange-200 glassy-card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">{recipes.length}</div>
              <div className="text-sm text-gray-600">Total Recipes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{mealLogs.length}</div>
              <div className="text-sm text-gray-600">Meals Logged</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {recipes.filter(r => r.lastMade).length}
              </div>
              <div className="text-sm text-gray-600">Recipes Tried</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {mealLogs.length > 0 ? Math.round(mealLogs.reduce((acc, log) => acc + log.rating, 0) / mealLogs.length * 10) / 10 : 0}
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <MealLogModal
        isOpen={isMealLogModalOpen}
        onClose={() => {
          setIsMealLogModalOpen(false);
          setSelectedRecipeForLog(null);
        }}
        recipe={selectedRecipeForLog}
        onSave={handleSaveMealLog}
      />

      <AddRecipeModal
        isOpen={isAddRecipeModalOpen}
        onClose={() => {
          setIsAddRecipeModalOpen(false);
          setSelectedRecipeForEdit(null);
        }}
        recipe={selectedRecipeForEdit}
        onSave={handleSaveRecipe}
      />
    </div>
  );
};

export default Index;
