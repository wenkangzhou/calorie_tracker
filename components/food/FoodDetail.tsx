'use client';

import { useState } from 'react';
import { Food, MealType } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/useStore';
import { Flame, Dumbbell, Wheat as WheatIcon, Droplets, Plus, Minus } from 'lucide-react';

interface FoodDetailProps {
  food: Food | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FoodDetail({ food, open, onOpenChange }: FoodDetailProps) {
  const { t, i18n } = useTranslation();
  const { addMealItem, addToRecent } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState<MealType>('breakfast');

  if (!food) return null;

  const displayName = i18n.language === 'zh' ? food.name : food.nameEn;

  const handleAdd = () => {
    addMealItem({
      food,
      quantity,
      mealType,
    });
    addToRecent(food);
    onOpenChange(false);
    setQuantity(1);
  };

  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{displayName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Nutrition Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex items-center justify-center p-6 bg-primary/10 rounded-xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Flame className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-foreground mt-2">
                  {Math.round(food.calories * quantity)}
                </div>
                <div className="text-sm text-muted-foreground">{t('food.calories')} ({t('dashboard.kcal')})</div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl text-center">
              <Dumbbell className="w-5 h-5 mx-auto text-blue-500" />
              <div className="text-lg font-semibold mt-1">
                {(food.protein * quantity).toFixed(1)}g
              </div>
              <div className="text-xs text-muted-foreground">{t('food.protein')}</div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-xl text-center">
              <WheatIcon className="w-5 h-5 mx-auto text-amber-500" />
              <div className="text-lg font-semibold mt-1">
                {(food.carbs * quantity).toFixed(1)}g
              </div>
              <div className="text-xs text-muted-foreground">{t('food.carbs')}</div>
            </div>

            <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-xl text-center">
              <Droplets className="w-5 h-5 mx-auto text-rose-500" />
              <div className="text-lg font-semibold mt-1">
                {(food.fat * quantity).toFixed(1)}g
              </div>
              <div className="text-xs text-muted-foreground">{t('food.fat')}</div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
              <div className="text-lg font-semibold text-foreground">
                {food.servingSize * quantity}{food.servingUnit}
              </div>
              <div className="text-xs text-muted-foreground">{t('food.servingSize')}</div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <Label>{t('food.quantity')}</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                min={0.5}
                step={0.5}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                className="text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 0.5)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Meal Type Selector */}
          <div className="space-y-2">
            <Label>{t('food.mealType')}</Label>
            <Select value={mealType} onValueChange={(v) => setMealType(v as MealType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t(`mealTypes.${type}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Add Button */}
          <Button onClick={handleAdd} className="w-full">
            {t('common.add')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
