
export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: 'morning' | 'lunch' | 'evening' | 'snacks' | 'desserts' | 'drinks';
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  image: string;
  ingredients: { quantity: string; unit: string; ingredient: string }[];
  instructions: string[];
  tags: string[];
  source?: string;
  dateAdded: string;
  lastMade?: string;
}

export interface MealLog {
  id: string;
  recipeId: string;
  date: string;
  time?: string;
  photo?: string;
  rating: number;
  notes: string;
  servingsMade: number;
  whoAte: ('you' | 'partner' | 'both')[];
  modifications: string;
  wouldMakeAgain: boolean;
}

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Grilled Chicken Caesar Salad',
    description: 'Fresh romaine lettuce topped with perfectly grilled chicken, parmesan cheese, and homemade caesar dressing',
    category: 'lunch',
    difficulty: 'easy',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    ingredients: [
      { quantity: '2', unit: 'pieces', ingredient: 'chicken breast' },
      { quantity: '1', unit: 'head', ingredient: 'romaine lettuce' },
      { quantity: '1/2', unit: 'cup', ingredient: 'parmesan cheese' },
      { quantity: '1/4', unit: 'cup', ingredient: 'caesar dressing' },
      { quantity: '1', unit: 'cup', ingredient: 'croutons' }
    ],
    instructions: [
      'Season chicken breast with salt and pepper',
      'Grill chicken for 6-8 minutes per side until cooked through',
      'Chop romaine lettuce and arrange in bowls',
      'Slice grilled chicken and place on top of lettuce',
      'Add croutons and parmesan cheese',
      'Drizzle with caesar dressing and serve'
    ],
    tags: ['healthy', 'protein', 'quick'],
    dateAdded: '2024-01-15'
  },
  {
    id: '2',
    name: 'Fluffy Blueberry Pancakes',
    description: 'Light and fluffy pancakes bursting with fresh blueberries, perfect for a weekend morning',
    category: 'morning',
    difficulty: 'easy',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    ingredients: [
      { quantity: '2', unit: 'cups', ingredient: 'all-purpose flour' },
      { quantity: '2', unit: 'tbsp', ingredient: 'sugar' },
      { quantity: '2', unit: 'tsp', ingredient: 'baking powder' },
      { quantity: '1/2', unit: 'tsp', ingredient: 'salt' },
      { quantity: '2', unit: 'cups', ingredient: 'milk' },
      { quantity: '2', unit: 'large', ingredient: 'eggs' },
      { quantity: '1/4', unit: 'cup', ingredient: 'melted butter' },
      { quantity: '1', unit: 'cup', ingredient: 'fresh blueberries' }
    ],
    instructions: [
      'Mix dry ingredients in a large bowl',
      'Whisk together milk, eggs, and melted butter',
      'Combine wet and dry ingredients until just mixed',
      'Fold in blueberries gently',
      'Cook on griddle until bubbles form, then flip',
      'Serve hot with maple syrup'
    ],
    tags: ['breakfast', 'sweet', 'family-favorite'],
    dateAdded: '2024-01-20'
  },
  {
    id: '3',
    name: 'Creamy Mushroom Risotto',
    description: 'Rich and creamy Arborio rice cooked with wild mushrooms and finished with parmesan',
    category: 'evening',
    difficulty: 'medium',
    prepTime: 15,
    cookTime: 35,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
    ingredients: [
      { quantity: '1', unit: 'cup', ingredient: 'Arborio rice' },
      { quantity: '4', unit: 'cups', ingredient: 'vegetable broth' },
      { quantity: '8', unit: 'oz', ingredient: 'mixed mushrooms' },
      { quantity: '1', unit: 'medium', ingredient: 'onion, diced' },
      { quantity: '3', unit: 'cloves', ingredient: 'garlic, minced' },
      { quantity: '1/2', unit: 'cup', ingredient: 'white wine' },
      { quantity: '1/2', unit: 'cup', ingredient: 'parmesan cheese' },
      { quantity: '2', unit: 'tbsp', ingredient: 'butter' }
    ],
    instructions: [
      'Heat broth in a separate pot and keep warm',
      'Sauté mushrooms until golden, set aside',
      'Cook onion and garlic until translucent',
      'Add rice and stir for 2 minutes',
      'Add wine and stir until absorbed',
      'Add warm broth one ladle at a time, stirring constantly',
      'Fold in mushrooms, butter, and parmesan',
      'Serve immediately'
    ],
    tags: ['vegetarian', 'comfort-food', 'italian'],
    dateAdded: '2024-01-10'
  },
  {
    id: '4',
    name: 'Double Chocolate Chip Cookies',
    description: 'Chewy chocolate cookies loaded with dark chocolate chips for the ultimate indulgence',
    category: 'desserts',
    difficulty: 'easy',
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
    ingredients: [
      { quantity: '2 1/4', unit: 'cups', ingredient: 'all-purpose flour' },
      { quantity: '1/2', unit: 'cup', ingredient: 'cocoa powder' },
      { quantity: '1', unit: 'tsp', ingredient: 'baking soda' },
      { quantity: '1', unit: 'cup', ingredient: 'butter, softened' },
      { quantity: '3/4', unit: 'cup', ingredient: 'brown sugar' },
      { quantity: '1/2', unit: 'cup', ingredient: 'granulated sugar' },
      { quantity: '2', unit: 'large', ingredient: 'eggs' },
      { quantity: '2', unit: 'cups', ingredient: 'dark chocolate chips' }
    ],
    instructions: [
      'Preheat oven to 375°F',
      'Mix flour, cocoa powder, and baking soda',
      'Cream butter and sugars until fluffy',
      'Beat in eggs one at a time',
      'Gradually blend in flour mixture',
      'Stir in chocolate chips',
      'Drop rounded tablespoons onto baking sheet',
      'Bake 9-11 minutes until set'
    ],
    tags: ['dessert', 'chocolate', 'baking'],
    dateAdded: '2024-01-25'
  },
  {
    id: '5',
    name: 'Tropical Green Smoothie',
    description: 'Refreshing blend of spinach, mango, pineapple, and coconut water for a healthy boost',
    category: 'drinks',
    difficulty: 'easy',
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1553530979-4bf014e1c288?w=400&h=300&fit=crop',
    ingredients: [
      { quantity: '2', unit: 'cups', ingredient: 'fresh spinach' },
      { quantity: '1', unit: 'cup', ingredient: 'frozen mango chunks' },
      { quantity: '1/2', unit: 'cup', ingredient: 'frozen pineapple' },
      { quantity: '1', unit: 'banana', ingredient: 'banana' },
      { quantity: '1', unit: 'cup', ingredient: 'coconut water' },
      { quantity: '1', unit: 'tbsp', ingredient: 'chia seeds' },
      { quantity: '1', unit: 'tsp', ingredient: 'honey' }
    ],
    instructions: [
      'Add spinach and coconut water to blender first',
      'Add frozen fruits and banana',
      'Add chia seeds and honey',
      'Blend on high until smooth and creamy',
      'Add more coconut water if needed for consistency',
      'Serve immediately in chilled glasses'
    ],
    tags: ['healthy', 'vegan', 'quick', 'refreshing'],
    dateAdded: '2024-01-12'
  },
  {
    id: '6',
    name: 'Spicy Buffalo Cauliflower Bites',
    description: 'Crispy baked cauliflower tossed in spicy buffalo sauce - a healthier take on wings',
    category: 'snacks',
    difficulty: 'easy',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1619158499589-0a8e2e4c9e8c?w=400&h=300&fit=crop',
    ingredients: [
      { quantity: '1', unit: 'head', ingredient: 'cauliflower, cut into florets' },
      { quantity: '1/2', unit: 'cup', ingredient: 'all-purpose flour' },
      { quantity: '1/2', unit: 'cup', ingredient: 'water' },
      { quantity: '1/2', unit: 'cup', ingredient: 'buffalo sauce' },
      { quantity: '2', unit: 'tbsp', ingredient: 'butter, melted' },
      { quantity: '1', unit: 'tsp', ingredient: 'garlic powder' },
      { quantity: '1/2', unit: 'tsp', ingredient: 'paprika' }
    ],
    instructions: [
      'Preheat oven to 450°F',
      'Mix flour, water, garlic powder, and paprika for batter',
      'Dip cauliflower florets in batter',
      'Bake for 15 minutes until golden',
      'Mix buffalo sauce with melted butter',
      'Toss baked cauliflower in buffalo mixture',
      'Bake additional 10 minutes',
      'Serve with ranch or blue cheese dip'
    ],
    tags: ['vegetarian', 'spicy', 'healthy', 'game-day'],
    dateAdded: '2024-01-18'
  }
];
