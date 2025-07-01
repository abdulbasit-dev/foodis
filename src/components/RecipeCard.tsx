
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clock, Users, ChefHat, MoreVertical, Edit, Trash2, Calendar } from 'lucide-react';
import { Recipe } from '@/data/recipes';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
  onLogMeal: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete, onLogMeal }) => {
  const [imageError, setImageError] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'morning': return '🌅';
      case 'lunch': return '☀️';
      case 'evening': return '🌙';
      case 'snacks': return '🍿';
      case 'desserts': return '🍰';
      case 'drinks': return '🥤';
      default: return '🍽️';
    }
  };

  return (
    <Card className="max-w-sm bg-white border border-gray-200 rounded-lg recipe-card-shadow hover:recipe-card-shadow-hover transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img 
          className="w-full h-48 object-cover rounded-t-lg" 
          src={imageError ? '/placeholder.svg' : recipe.image}
          alt={recipe.name}
          onError={() => setImageError(true)}
        />
        
        {/* Three-dot menu */}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur-sm border border-gray-200">
              <DropdownMenuItem 
                onClick={() => onEdit(recipe)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit className="h-4 w-4" />
                Edit Recipe
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onLogMeal(recipe)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                Log as Made/Eaten
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(recipe.id)}
                className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Delete Recipe
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-white/90 text-gray-700 border-0">
            {getCategoryEmoji(recipe.category)} {recipe.category}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 line-clamp-1">
          {recipe.name}
        </h5>
        
        <p className="mb-3 text-sm text-gray-700 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        {/* Recipe Info */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{recipe.prepTime + recipe.cookTime}min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-3 w-3" />
            <Badge className={`text-xs px-2 py-0 ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </Badge>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs text-orange-600 border-orange-200">
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 3 && (
            <Badge variant="outline" className="text-xs text-gray-500">
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* View Recipe Button */}
        <Button className="w-full recipe-gradient text-white hover:shadow-lg transition-all duration-200">
          View Recipe
          <svg className="w-3.5 h-3.5 ml-2" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
