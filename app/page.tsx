'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/useStore';
import { ProgressRing } from '@/components/layout/ProgressRing';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { 
  Flame, 
  Dumbbell, 
  Wheat as WheatIcon, 
  Droplets, 
  Plus, 
  Minus,
  ChevronLeft, 
  ChevronRight,
  Coffee,
  UtensilsCrossed,
  Moon,
  Cookie,
  Trash2,
  Droplet
} from 'lucide-react';
import { formatDate, getGreeting } from '@/lib/utils';
import { FoodDetail } from '@/components/food/FoodDetail';
import { Food, MealType, MealItem } from '@/types';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { 
    userProfile, 
    selectedDate, 
    setSelectedDate, 
    getTodayLog, 
    getNutritionSummary,
    removeMealItem,
    addWater
  } = useStore();

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const todayLog = getTodayLog();
  const summary = getNutritionSummary();

  const calorieProgress = Math.min(
    (summary.calories / userProfile.dailyCalorieGoal) * 100,
    100
  );
  const remaining = userProfile.dailyCalorieGoal - summary.calories;

  const mealIcons: Record<MealType, React.ReactNode> = {
    breakfast: <Coffee className="w-5 h-5" />,
    lunch: <UtensilsCrossed className="w-5 h-5" />,
    dinner: <Moon className="w-5 h-5" />,
    snack: <Cookie className="w-5 h-5" />,
  };

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today.toISOString().split('T')[0]);
  };

  const hour = new Date().getHours();
  const greeting = getGreeting(hour, (key) => t(`greeting.${key.split('.')[1]}`));

  const groupedItems = todayLog.items.reduce((acc, item) => {
    if (!acc[item.mealType]) acc[item.mealType] = [];
    acc[item.mealType].push(item);
    return acc;
  }, {} as Record<MealType, MealItem[]>);

  return (
    <div className="page-transition pb-24">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{greeting}</p>
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xl">👋</span>
          </div>
        </div>
      </header>

      {/* Date Selector */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between bg-card border rounded-xl p-3">
          <button
            onClick={handlePrevDay}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleToday}
            className="text-center"
          >
            <p className="font-medium">{formatDate(currentDate, i18n.language)}</p>
          </button>
          <button
            onClick={handleNextDay}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calorie Progress */}
      <div className="px-4 mb-6">
        <div className="bg-card border rounded-2xl p-6">
          <div className="flex flex-col items-center">
            <ProgressRing progress={calorieProgress} size={200} strokeWidth={16}>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  {t('dashboard.consumed')}
                </div>
                <div className="text-4xl font-bold text-foreground">
                  {Math.round(summary.calories)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  / {userProfile.dailyCalorieGoal} {t('dashboard.kcal')}
                </div>
                <div className={cn(
                  "text-sm mt-2 font-medium",
                  remaining >= 0 ? "text-primary" : "text-destructive"
                )}>
                  {remaining >= 0 
                    ? `${Math.round(remaining)} ${t('dashboard.remaining')}` 
                    : `${Math.round(Math.abs(remaining))} ${t('dashboard.remaining')}`}
                </div>
              </div>
            </ProgressRing>
          </div>
        </div>
      </div>

      {/* Macros */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <WheatIcon className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">{t('dashboard.carbs')}</span>
            </div>
            <div className="text-lg font-bold">{Math.round(summary.carbs)}g</div>
            <div className="text-xs text-muted-foreground">
              / {userProfile.dailyCarbsGoal}g
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Dumbbell className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">{t('dashboard.protein')}</span>
            </div>
            <div className="text-lg font-bold">{Math.round(summary.protein)}g</div>
            <div className="text-xs text-muted-foreground">
              / {userProfile.dailyProteinGoal}g
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Droplets className="w-4 h-4 text-rose-500" />
              <span className="text-xs text-muted-foreground">{t('dashboard.fat')}</span>
            </div>
            <div className="text-lg font-bold">{Math.round(summary.fat)}g</div>
            <div className="text-xs text-muted-foreground">
              / {userProfile.dailyFatGoal}g
            </div>
          </Card>
        </div>
      </div>

      {/* Water Intake */}
      <div className="px-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{t('dashboard.water')}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {todayLog.waterIntake} {t('dashboard.glasses')}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addWater(-1)}
              disabled={todayLog.waterIntake <= 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => addWater(1)}
            >
              <Plus className="w-4 h-4 mr-1" />
              {t('common.add')}
            </Button>
          </div>
        </Card>
      </div>

      {/* Meal Sections */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('dashboard.meals.title')}</h2>
        {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((mealType) => {
          const items = groupedItems[mealType] || [];
          const mealCalories = items.reduce((sum, item) => 
            sum + item.food.calories * item.quantity, 0
          );

          return (
            <Card key={mealType} className="mb-3 overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b bg-muted/30">
                <div className="flex items-center gap-2">
                  {mealIcons[mealType]}
                  <span className="font-medium">{t(`mealTypes.${mealType}`)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {Math.round(mealCalories)} {t('dashboard.kcal')}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push('/search')}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-2">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    {t('dashboard.noFood')}
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 hover:bg-muted rounded-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-sm">
                            {i18n.language === 'zh' ? item.food.name : item.food.nameEn}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} × {item.food.servingSize}{item.food.servingUnit}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {Math.round(item.food.calories * item.quantity)} {t('dashboard.kcal')}
                        </span>
                        <button
                          onClick={() => removeMealItem(item.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full shadow-lg"
        onClick={() => router.push('/search')}
      >
        <Plus className="w-6 h-6" />
      </Button>

      <FoodDetail
        food={selectedFood}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}
