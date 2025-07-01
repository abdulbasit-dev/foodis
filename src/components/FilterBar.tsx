
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  selectedPrepTime: string;
  onPrepTimeChange: (time: string) => void;
}

const categories = [
  { id: 'all', label: 'All', emoji: '🍽️' },
  { id: 'morning', label: 'Morning', emoji: '🌅' },
  { id: 'lunch', label: 'Lunch', emoji: '☀️' },
  { id: 'evening', label: 'Evening', emoji: '🌙' },
  { id: 'snacks', label: 'Snacks', emoji: '🍿' },
  { id: 'desserts', label: 'Desserts', emoji: '🍰' },
  { id: 'drinks', label: 'Drinks', emoji: '🥤' }
];

const difficulties = [
  { id: 'all', label: 'All Levels' },
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' }
];

const prepTimes = [
  { id: 'all', label: 'Any Time' },
  { id: '15', label: 'Under 15min' },
  { id: '30', label: '15-30min' },
  { id: '60', label: '30-60min' },
  { id: '60+', label: '1+ hour' }
];

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedPrepTime,
  onPrepTimeChange
}) => {
  return (
    <div className="space-y-6 mb-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search recipes or ingredients..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white/80 backdrop-blur-sm border-orange-200 focus:border-orange-400 focus:ring-orange-400"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={`transition-all duration-200 ${
              selectedCategory === category.id
                ? 'recipe-gradient text-white shadow-lg'
                : 'bg-white/80 hover:bg-white hover:shadow-md border-orange-200'
            }`}
          >
            <span className="mr-2">{category.emoji}</span>
            {category.label}
          </Button>
        ))}
      </div>

      {/* Additional Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-1">
          <span className="text-sm font-medium text-gray-600 self-center mr-2">Difficulty:</span>
          {difficulties.map((difficulty) => (
            <Badge
              key={difficulty.id}
              variant={selectedDifficulty === difficulty.id ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                selectedDifficulty === difficulty.id
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : 'hover:bg-orange-50'
              }`}
              onClick={() => onDifficultyChange(difficulty.id)}
            >
              {difficulty.label}
            </Badge>
          ))}
        </div>

        {/* Prep Time Filter */}
        <div className="flex flex-wrap gap-1">
          <span className="text-sm font-medium text-gray-600 self-center mr-2">Prep Time:</span>
          {prepTimes.map((time) => (
            <Badge
              key={time.id}
              variant={selectedPrepTime === time.id ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                selectedPrepTime === time.id
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : 'hover:bg-orange-50'
              }`}
              onClick={() => onPrepTimeChange(time.id)}
            >
              {time.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
