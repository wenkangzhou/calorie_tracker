'use client';

import { useEffect, useState } from 'react';
import { Food } from '@/types';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { getCategoryLabel } from '@/lib/foodDatabase';
import { Flame, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

interface FoodCardProps {
  food: Food;
  onClick?: () => void;
  showFavorite?: boolean;
}

export function FoodCard({ food, onClick, showFavorite = true }: FoodCardProps) {
  const { t, i18n } = useTranslation();
  const { isFavorite, toggleFavorite } = useStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isFav = mounted ? isFavorite(food.id) : false;

  const displayName = i18n.language === 'zh' ? food.name : food.nameEn;
  const categoryLabel = getCategoryLabel(food.category, i18n.language);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(food.id);
  };

  return (
    <Card
      onClick={onClick}
      className="p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate">
              {displayName}
            </h3>
            {showFavorite && mounted && (
              <button
                onClick={handleFavoriteClick}
                className={cn(
                  'p-1 rounded-full transition-colors',
                  isFav
                    ? 'text-red-500'
                    : 'text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-500'
                )}
              >
                <Heart className={cn('w-4 h-4', isFav && 'fill-current')} />
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{categoryLabel}</p>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-medium">{food.calories}</span>
              <span className="text-muted-foreground">{t('dashboard.kcal')}</span>
            </div>
            <span className="text-muted-foreground">
              {food.servingSize}{food.servingUnit}/{t('food.perServing')}
            </span>
          </div>
        </div>
        <div className="ml-4 text-right">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>P: {food.protein}g</div>
            <div>C: {food.carbs}g</div>
            <div>F: {food.fat}g</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
