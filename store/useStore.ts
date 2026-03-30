'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Food, MealItem, MealType, DailyLog, UserProfile, NutritionSummary } from '@/types';

interface AppState {
  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  
  // Daily Logs
  dailyLogs: Record<string, DailyLog>;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  addMealItem: (item: Omit<MealItem, 'id' | 'addedAt'>) => void;
  removeMealItem: (itemId: string) => void;
  getTodayLog: () => DailyLog;
  getNutritionSummary: (date?: string) => NutritionSummary;
  addWater: (amount: number) => void;
  
  // Recent Foods
  recentFoods: Food[];
  addToRecent: (food: Food) => void;
  
  // Favorites
  favorites: string[];
  toggleFavorite: (foodId: string) => void;
  isFavorite: (foodId: string) => boolean;
}

const getTodayKey = () => new Date().toISOString().split('T')[0];

const initialUserProfile: UserProfile = {
  name: 'User',
  dailyCalorieGoal: 1200,
  dailyProteinGoal: 60,
  dailyCarbsGoal: 150,
  dailyFatGoal: 40,
  streakDays: 7,
  joinDate: new Date(),
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User Profile
      userProfile: initialUserProfile,
      updateUserProfile: (profile) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...profile },
        })),

      // Daily Logs
      dailyLogs: {},
      selectedDate: getTodayKey(),
      setSelectedDate: (date) => set({ selectedDate: date }),

      getTodayLog: () => {
        const { dailyLogs, selectedDate } = get();
        return (
          dailyLogs[selectedDate] || {
            date: selectedDate,
            items: [],
            waterIntake: 0,
          }
        );
      },

      addMealItem: (item) =>
        set((state) => {
          const date = state.selectedDate;
          const log = state.dailyLogs[date] || {
            date,
            items: [],
            waterIntake: 0,
          };
          const newItem: MealItem = {
            ...item,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            addedAt: new Date(),
          };
          return {
            dailyLogs: {
              ...state.dailyLogs,
              [date]: {
                ...log,
                items: [...log.items, newItem],
              },
            },
          };
        }),

      removeMealItem: (itemId) =>
        set((state) => {
          const date = state.selectedDate;
          const log = state.dailyLogs[date];
          if (!log) return state;
          return {
            dailyLogs: {
              ...state.dailyLogs,
              [date]: {
                ...log,
                items: log.items.filter((item) => item.id !== itemId),
              },
            },
          };
        }),

      getNutritionSummary: (date?: string) => {
        const targetDate = date || get().selectedDate;
        const log = get().dailyLogs[targetDate];
        if (!log || log.items.length === 0) {
          return { calories: 0, protein: 0, carbs: 0, fat: 0 };
        }
        return log.items.reduce(
          (sum, item) => ({
            calories: sum.calories + item.food.calories * item.quantity,
            protein: sum.protein + item.food.protein * item.quantity,
            carbs: sum.carbs + item.food.carbs * item.quantity,
            fat: sum.fat + item.food.fat * item.quantity,
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
      },

      addWater: (amount) =>
        set((state) => {
          const date = state.selectedDate;
          const log = state.dailyLogs[date] || {
            date,
            items: [],
            waterIntake: 0,
          };
          return {
            dailyLogs: {
              ...state.dailyLogs,
              [date]: {
                ...log,
                waterIntake: Math.max(0, log.waterIntake + amount),
              },
            },
          };
        }),

      // Recent Foods
      recentFoods: [],
      addToRecent: (food) =>
        set((state) => {
          const filtered = state.recentFoods.filter((f) => f.id !== food.id);
          return {
            recentFoods: [food, ...filtered].slice(0, 20),
          };
        }),

      // Favorites
      favorites: [],
      toggleFavorite: (foodId) =>
        set((state) => {
          const isFav = state.favorites.includes(foodId);
          return {
            favorites: isFav
              ? state.favorites.filter((id) => id !== foodId)
              : [...state.favorites, foodId],
          };
        }),
      isFavorite: (foodId) => get().favorites.includes(foodId),
    }),
    {
      name: 'calorie-tracker-storage',
      partialize: (state) => ({
        userProfile: state.userProfile,
        dailyLogs: state.dailyLogs,
        recentFoods: state.recentFoods,
        favorites: state.favorites,
      }),
    }
  )
);
