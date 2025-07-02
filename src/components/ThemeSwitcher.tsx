
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Cog } from 'lucide-react';
import { useTheme, ColorTheme } from '@/contexts/ThemeContext';

const themes = [
  { id: 'pink' as ColorTheme, name: 'Pink', color: 'bg-pink-500', emoji: '🌸' },
  { id: 'green' as ColorTheme, name: 'Green', color: 'bg-green-500', emoji: '🌿' },
  { id: 'blue' as ColorTheme, name: 'Blue', color: 'bg-blue-500', emoji: '💙' },
  { id: 'purple' as ColorTheme, name: 'Purple', color: 'bg-purple-500', emoji: '💜' },
];

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();

  const handleThemeChange = (themeId: ColorTheme) => {
    console.log(`ThemeSwitcher: User clicked ${themeId}, current theme: ${currentTheme}`);
    setTheme(themeId);
  };

  console.log(`ThemeSwitcher: Rendering with current theme: ${currentTheme}`);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 right-4 z-[9999] bg-white hover:bg-gray-50 border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => console.log('Cog button clicked!')}
        >
          <Cog className="h-5 w-5 text-gray-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-white border-2 border-gray-200 shadow-xl z-[9999] mt-2"
        align="end"
        sideOffset={8}
      >
        <div className="px-3 py-2 text-sm font-semibold text-gray-700 border-b border-gray-200">
          Choose Theme Color
        </div>
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`flex items-center gap-3 cursor-pointer px-3 py-2 transition-colors ${
              currentTheme === theme.id 
                ? 'bg-blue-50 text-blue-700 font-semibold' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-4 h-4 rounded-full ${theme.color} border border-gray-300`} />
              <span className="text-lg">{theme.emoji}</span>
              <span className="text-gray-800">{theme.name}</span>
            </div>
            {currentTheme === theme.id && (
              <span className="ml-auto text-blue-600 font-bold">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
