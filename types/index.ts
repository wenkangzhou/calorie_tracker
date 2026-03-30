export interface Food {
  id: string;
  name: string;
  nameEn: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: FoodCategory;
  image?: string;
  servingSize: number;
  servingUnit: string;
}

export type FoodCategory = 
  | 'grain' 
  | 'vegetable' 
  | 'fruit' 
  | 'meat' 
  | 'seafood' 
  | 'dairy' 
  | 'egg' 
  | 'snack' 
  | 'beverage' 
  | 'other';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealItem {
  id: string;
  food: Food;
  quantity: number;
  mealType: MealType;
  addedAt: Date;
}

export interface DailyLog {
  date: string;
  items: MealItem[];
  waterIntake: number;
}

export interface UserProfile {
  name: string;
  avatar?: string;
  dailyCalorieGoal: number;
  dailyProteinGoal: number;
  dailyCarbsGoal: number;
  dailyFatGoal: number;
  streakDays: number;
  joinDate: Date;
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface WeeklyProgress {
  date: string;
  calories: number;
  goal: number;
}
