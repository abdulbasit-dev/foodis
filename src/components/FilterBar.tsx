
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
    <div className="space-y-8 mb-10">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
        <Input
          type="text"
          placeholder="Search recipes or ingredients..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-full text-lg shadow-lg"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="lg"
            onClick={() => onCategoryChange(category.id)}
            className={`transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category.id
                ? 'lovable-button text-white font-semibold'
                : 'lovable-outline font-medium'
            }`}
          >
            <span className="mr-2 text-lg">{category.emoji}</span>
            {category.label}
          </Button>
        ))}
      </div>

      {/* Additional Filters */}
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-semibold text-primary mr-3">Difficulty:</span>
          {difficulties.map((difficulty) => (
            <Badge
              key={difficulty.id}
              variant={selectedDifficulty === difficulty.id ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 px-4 py-2 text-sm font-medium ${
                selectedDifficulty === difficulty.id
                  ? 'lovable-button text-white border-0'
                  : 'bg-white/80 border-2 border-primary/40 text-primary hover:bg-primary/10'
              }`}
              onClick={() => onDifficultyChange(difficulty.id)}
            >
              {difficulty.label}
            </Badge>
          ))}
        </div>

        {/* Prep Time Filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-semibold text-primary mr-3">Prep Time:</span>
          {prepTimes.map((time) => (
            <Badge
              key={time.id}
              variant={selectedPrepTime === time.id ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 px-4 py-2 text-sm font-medium ${
                selectedPrepTime === time.id
                  ? 'lovable-button text-white border-0'
                  : 'bg-white/80 border-2 border-primary/40 text-primary hover:bg-primary/10'
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
