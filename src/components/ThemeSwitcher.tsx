
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
          className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border-2 hover:bg-white/95 shadow-lg"
        >
          <Cog className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-white/95 backdrop-blur-sm border-2 shadow-xl z-50"
        align="end"
      >
        <div className="px-3 py-2 text-sm font-semibold text-gray-700 border-b">
          Choose Theme Color
        </div>
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`flex items-center gap-3 cursor-pointer px-3 py-2 ${
              currentTheme === theme.id 
                ? 'bg-primary/10 text-primary font-semibold' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${theme.color}`} />
              <span className="text-lg">{theme.emoji}</span>
              <span>{theme.name}</span>
            </div>
            {currentTheme === theme.id && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
