'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { ProgressRing } from '@/components/layout/ProgressRing';
import { Flame, Trophy, Target, Calendar, TrendingUp, Award } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ProgressPage() {
  const { t, i18n } = useTranslation();
  const { userProfile, dailyLogs, getNutritionSummary } = useStore();

  // Calculate stats
  const stats = useMemo(() => {
    const dates = Object.keys(dailyLogs);
    const totalDays = dates.length;
    
    let goalReachedDays = 0;
    let totalCalories = 0;
    let bestDay = { date: '', calories: 0 };

    dates.forEach((date) => {
      const summary = getNutritionSummary(date);
      totalCalories += summary.calories;
      
      if (summary.calories >= userProfile.dailyCalorieGoal * 0.9 && 
          summary.calories <= userProfile.dailyCalorieGoal * 1.1) {
        goalReachedDays++;
      }

      if (summary.calories > bestDay.calories) {
        bestDay = { date, calories: summary.calories };
      }
    });

    return {
      totalDays,
      goalReachedDays,
      avgCalories: totalDays > 0 ? Math.round(totalCalories / totalDays) : 0,
      bestDay,
    };
  }, [dailyLogs, userProfile.dailyCalorieGoal, getNutritionSummary]);

  // Get last 7 days data
  const weeklyData = useMemo(() => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      const summary = getNutritionSummary(dateKey);
      
      data.push({
        date: dateKey,
        day: date.toLocaleDateString(i18n.language === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'short' }),
        calories: summary.calories,
        goal: userProfile.dailyCalorieGoal,
      });
    }
    
    return data;
  }, [getNutritionSummary, userProfile.dailyCalorieGoal, i18n.language]);

  const todaySummary = getNutritionSummary();
  const todayProgress = Math.min(
    (todaySummary.calories / userProfile.dailyCalorieGoal) * 100,
    100
  );

  return (
    <div className="page-transition pb-24 px-4">
      {/* Header */}
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold">{t('progress.title')}</h1>
        <p className="text-muted-foreground text-sm">
          {formatDate(new Date(), i18n.language)}
        </p>
      </header>

      {/* Streak Card */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="text-lg font-semibold">{t('progress.streak')}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">{userProfile.streakDays}</span>
              <span className="text-muted-foreground">{t('progress.days')}</span>
            </div>
          </div>
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
        </div>
      </Card>

      {/* Today's Progress */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          {t('dashboard.dailyGoal')}
        </h2>
        <div className="flex items-center justify-center">
          <ProgressRing progress={todayProgress} size={160} strokeWidth={12}>
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.round(todayProgress)}%</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round(todaySummary.calories)} / {userProfile.dailyCalorieGoal}
              </div>
            </div>
          </ProgressRing>
        </div>
      </Card>

      {/* Weekly Overview */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          {t('progress.weeklyOverview')}
        </h2>
        <div className="flex items-end justify-between h-40 gap-2">
          {weeklyData.map((day, index) => {
            const height = Math.min(
              (day.calories / userProfile.dailyCalorieGoal) * 100,
              100
            );
            const isToday = index === 6;
            
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center">
                <div className="w-full relative h-32 bg-muted rounded-lg overflow-hidden">
                  <div
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
                      isToday ? 'bg-primary' : 'bg-primary/60'
                    }`}
                    style={{ height: `${Math.max(height, 5)}%` }}
                  />
                </div>
                <span className={`text-xs mt-2 ${isToday ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                  {day.day}
                </span>
                <span className="text-xs text-muted-foreground">
                  {Math.round(day.calories)}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-muted-foreground">{t('progress.goalReached')}</span>
          </div>
          <div className="text-2xl font-bold">{stats.goalReachedDays}</div>
          <div className="text-xs text-muted-foreground">{t('progress.days')}</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-muted-foreground">{t('progress.daysTracked')}</span>
          </div>
          <div className="text-2xl font-bold">{stats.totalDays}</div>
          <div className="text-xs text-muted-foreground">{t('progress.days')}</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm text-muted-foreground">{t('progress.avgCalories')}</span>
          </div>
          <div className="text-2xl font-bold">{stats.avgCalories}</div>
          <div className="text-xs text-muted-foreground">{t('dashboard.kcal')}</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-muted-foreground">{t('progress.bestDay')}</span>
          </div>
          <div className="text-2xl font-bold">{stats.bestDay.calories}</div>
          <div className="text-xs text-muted-foreground">{t('dashboard.kcal')}</div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">{t('progress.achievements')}</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium">连续打卡达人</p>
              <p className="text-sm text-muted-foreground">连续记录7天</p>
            </div>
            {userProfile.streakDays >= 7 && (
              <Award className="w-6 h-6 text-yellow-500" />
            )}
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium">目标达成者</p>
              <p className="text-sm text-muted-foreground">连续3天达成目标</p>
            </div>
            {stats.goalReachedDays >= 3 && (
              <Award className="w-6 h-6 text-yellow-500" />
            )}
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium">坚持不懈</p>
              <p className="text-sm text-muted-foreground">记录30天</p>
            </div>
            {stats.totalDays >= 30 && (
              <Award className="w-6 h-6 text-yellow-500" />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
