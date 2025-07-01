
import React, { useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Star, Upload, Calendar, Clock } from 'lucide-react';
import { Recipe } from '@/data/recipes';

interface MealLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
  onSave: (logData: any) => void;
}

const MealLogModal: React.FC<MealLogModalProps> = ({ isOpen, onClose, recipe, onSave }) => {
  const [logData, setLogData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '',
    photo: null as File | null,
    rating: 0,
    notes: '',
    servingsMade: recipe?.servings || 1,
    whoAte: [] as string[],
    modifications: '',
    wouldMakeAgain: true
  });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSave = () => {
    const finalData = {
      ...logData,
      rating,
      recipeId: recipe?.id,
      recipeName: recipe?.name
    };
    onSave(finalData);
    onClose();
    // Reset form
    setLogData({
      date: new Date().toISOString().split('T')[0],
      time: '',
      photo: null,
      rating: 0,
      notes: '',
      servingsMade: recipe?.servings || 1,
      whoAte: [],
      modifications: '',
      wouldMakeAgain: true
    });
    setRating(0);
    setHoverRating(0);
  };

  const handleWhoAteChange = (person: string, checked: boolean) => {
    if (checked) {
      setLogData(prev => ({ ...prev, whoAte: [...prev.whoAte, person] }));
    } else {
      setLogData(prev => ({ ...prev, whoAte: prev.whoAte.filter(p => p !== person) }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogData(prev => ({ ...prev, photo: file }));
    }
  };

  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Log Meal: {recipe.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={logData.date}
                onChange={(e) => setLogData(prev => ({ ...prev, date: e.target.value }))}
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time (optional)
              </Label>
              <Input
                id="time"
                type="time"
                value={logData.time}
                onChange={(e) => setLogData(prev => ({ ...prev, time: e.target.value }))}
                className="border-gray-300"
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Meal Photo
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="border-gray-300"
            />
            {logData.photo && (
              <p className="text-sm text-gray-600">
                Selected: {logData.photo.name}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>How did it turn out?</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating ? `${rating}/5 stars` : 'No rating'}
              </span>
            </div>
          </div>

          {/* Servings Made */}
          <div className="space-y-2">
            <Label htmlFor="servings">Servings Made</Label>
            <Input
              id="servings"
              type="number"
              min="1"
              value={logData.servingsMade}
              onChange={(e) => setLogData(prev => ({ ...prev, servingsMade: parseInt(e.target.value) }))}
              className="border-gray-300"
            />
          </div>

          {/* Who Ate It */}
          <div className="space-y-2">
            <Label>Who ate it?</Label>
            <div className="flex flex-wrap gap-3">
              {['you', 'partner', 'both'].map((person) => (
                <div key={person} className="flex items-center space-x-2">
                  <Checkbox
                    id={person}
                    checked={logData.whoAte.includes(person)}
                    onCheckedChange={(checked) => handleWhoAteChange(person, checked as boolean)}
                  />
                  <Label htmlFor={person} className="capitalize">
                    {person}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="How was it? Any comments about taste, texture, etc."
              value={logData.notes}
              onChange={(e) => setLogData(prev => ({ ...prev, notes: e.target.value }))}
              className="border-gray-300 min-h-[80px]"
            />
          </div>

          {/* Modifications */}
          <div className="space-y-2">
            <Label htmlFor="modifications">Modifications Made</Label>
            <Textarea
              id="modifications"
              placeholder="Any changes you made to the original recipe?"
              value={logData.modifications}
              onChange={(e) => setLogData(prev => ({ ...prev, modifications: e.target.value }))}
              className="border-gray-300"
            />
          </div>

          {/* Would Make Again */}
          <div className="flex items-center justify-between">
            <Label htmlFor="would-make-again">Would make again?</Label>
            <Switch
              id="would-make-again"
              checked={logData.wouldMakeAgain}
              onCheckedChange={(checked) => setLogData(prev => ({ ...prev, wouldMakeAgain: checked }))}
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
              Save Log Entry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealLogModal;
