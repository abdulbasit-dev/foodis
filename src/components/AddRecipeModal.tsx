
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Upload } from 'lucide-react';
import { Recipe } from '@/data/recipes';

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Omit<Recipe, 'id' | 'dateAdded'>) => void;
  recipe?: Recipe | null;
}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ isOpen, onClose, onSave, recipe }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'lunch' as Recipe['category'],
    difficulty: 'easy' as Recipe['difficulty'],
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    image: '',
    ingredients: [{ quantity: '', unit: '', ingredient: '' }],
    instructions: [''],
    tags: [] as string[],
    source: ''
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        description: recipe.description,
        category: recipe.category,
        difficulty: recipe.difficulty,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        image: recipe.image,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        tags: recipe.tags,
        source: recipe.source || ''
      });
    }
  }, [recipe]);

  const handleSave = () => {
    const recipeData = {
      ...formData,
      lastMade: recipe?.lastMade
    };
    onSave(recipeData);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'lunch',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      image: '',
      ingredients: [{ quantity: '', unit: '', ingredient: '' }],
      instructions: [''],
      tags: [],
      source: ''
    });
    setNewTag('');
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { quantity: '', unit: '', ingredient: '' }]
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => 
        i === index ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => 
        i === index ? value : inst
      )
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {recipe ? 'Edit Recipe' : 'Add New Recipe'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Recipe Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter recipe name"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value: Recipe['category']) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="morning">Morning 🌅</SelectItem>
                  <SelectItem value="lunch">Lunch ☀️</SelectItem>
                  <SelectItem value="evening">Evening 🌙</SelectItem>
                  <SelectItem value="snacks">Snacks 🍿</SelectItem>
                  <SelectItem value="desserts">Desserts 🍰</SelectItem>
                  <SelectItem value="drinks">Drinks 🥤</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the recipe"
              className="border-gray-300"
            />
          </div>

          {/* Recipe Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={formData.difficulty} onValueChange={(value: Recipe['difficulty']) => setFormData(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prepTime">Prep Time (min)</Label>
              <Input
                id="prepTime"
                type="number"
                value={formData.prepTime}
                onChange={(e) => setFormData(prev => ({ ...prev, prepTime: parseInt(e.target.value) }))}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cookTime">Cook Time (min)</Label>
              <Input
                id="cookTime"
                type="number"
                value={formData.cookTime}
                onChange={(e) => setFormData(prev => ({ ...prev, cookTime: parseInt(e.target.value) }))}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData(prev => ({ ...prev, servings: parseInt(e.target.value) }))}
                className="border-gray-300"
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Recipe Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              className="border-gray-300"
            />
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            <Label>Ingredients</Label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Qty"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                  className="w-20 border-gray-300"
                />
                <Input
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                  className="w-20 border-gray-300"
                />
                <Input
                  placeholder="Ingredient"
                  value={ingredient.ingredient}
                  onChange={(e) => updateIngredient(index, 'ingredient', e.target.value)}
                  className="flex-1 border-gray-300"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeIngredient(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addIngredient}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient
            </Button>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label>Instructions</Label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 items-start">
                <span className="text-sm font-medium text-gray-500 mt-2 min-w-[20px]">
                  {index + 1}.
                </span>
                <Textarea
                  placeholder="Enter cooking instruction"
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  className="flex-1 border-gray-300"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInstruction(index)}
                  className="text-red-600 hover:text-red-700 mt-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addInstruction}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="border-gray-300"
              />
              <Button type="button" onClick={addTag} size="sm">
                Add
              </Button>
            </div>
          </div>

          {/* Source */}
          <div className="space-y-2">
            <Label htmlFor="source">Source (optional)</Label>
            <Input
              id="source"
              value={formData.source}
              onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
              placeholder="Where did you get this recipe?"
              className="border-gray-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 recipe-gradient text-white"
            >
              {recipe ? 'Update Recipe' : 'Save Recipe'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecipeModal;
