'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Target, Settings, Sun, Moon, Monitor, Globe, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import i18n from '@/lib/i18n';

export default function ProfilePage() {
  const { t, i18n: i18nInstance } = useTranslation();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { userProfile, updateUserProfile } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    name: userProfile.name,
    dailyCalorieGoal: userProfile.dailyCalorieGoal,
    dailyProteinGoal: userProfile.dailyProteinGoal,
    dailyCarbsGoal: userProfile.dailyCarbsGoal,
    dailyFatGoal: userProfile.dailyFatGoal,
  });

  const handleSaveGoals = () => {
    updateUserProfile(formData);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="page-transition pb-24 px-4">
        <header className="pt-6 pb-4">
          <div className="h-8 w-32 bg-muted rounded" />
        </header>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-muted" />
            <div className="space-y-2">
              <div className="h-6 w-24 bg-muted rounded" />
              <div className="h-4 w-32 bg-muted rounded" />
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6 h-96 bg-muted" />
        <Card className="p-6 mb-6 h-64 bg-muted" />
      </div>
    );
  }

  // Use resolvedTheme for display, theme for setting
  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <div className="page-transition pb-24 px-4">
      {/* Header */}
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
      </header>

      {/* Profile Card */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{userProfile.name}</h2>
            <p className="text-sm text-muted-foreground">
              {t('progress.daysTracked')}: {Object.keys(useStore.getState().dailyLogs).length} {t('progress.days')}
            </p>
          </div>
        </div>
      </Card>

      {/* Goals Section */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          {t('profile.goals')}
        </h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">{t('profile.name')}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="calories">
              {t('profile.dailyCalorieGoal')} ({t('dashboard.kcal')})
            </Label>
            <Input
              id="calories"
              type="number"
              value={formData.dailyCalorieGoal}
              onChange={(e) => setFormData({ ...formData, dailyCalorieGoal: parseInt(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="protein">
                {t('profile.dailyProteinGoal')} (g)
              </Label>
              <Input
                id="protein"
                type="number"
                value={formData.dailyProteinGoal}
                onChange={(e) => setFormData({ ...formData, dailyProteinGoal: parseInt(e.target.value) || 0 })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="carbs">
                {t('profile.dailyCarbsGoal')} (g)
              </Label>
              <Input
                id="carbs"
                type="number"
                value={formData.dailyCarbsGoal}
                onChange={(e) => setFormData({ ...formData, dailyCarbsGoal: parseInt(e.target.value) || 0 })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fat">
                {t('profile.dailyFatGoal')} (g)
              </Label>
              <Input
                id="fat"
                type="number"
                value={formData.dailyFatGoal}
                onChange={(e) => setFormData({ ...formData, dailyFatGoal: parseInt(e.target.value) || 0 })}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={handleSaveGoals} className="w-full">
            {t('profile.save')}
          </Button>
        </div>
      </Card>

      {/* Settings Section */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          {t('profile.settings')}
        </h2>

        {/* Language */}
        <div className="mb-6">
          <Label className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4" />
            {t('profile.language')}
          </Label>
          <div className="flex gap-2">
            <Button
              variant={i18nInstance.language === 'zh' ? 'default' : 'outline'}
              onClick={() => handleLanguageChange('zh')}
              className="flex-1"
            >
              中文
            </Button>
            <Button
              variant={i18nInstance.language === 'en' ? 'default' : 'outline'}
              onClick={() => handleLanguageChange('en')}
              className="flex-1"
            >
              English
            </Button>
          </div>
        </div>

        {/* Theme */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <Sun className="w-4 h-4" />
            {t('profile.theme')}
          </Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <Sun className="w-5 h-5" />
              <span className="text-xs">{t('profile.light')}</span>
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <Moon className="w-5 h-5" />
              <span className="text-xs">{t('profile.dark')}</span>
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'outline'}
              onClick={() => setTheme('system')}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <Monitor className="w-5 h-5" />
              <span className="text-xs">{t('profile.system')}</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t('appName')} v1.0.0
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          © 2024 Calorie Tracker
        </p>
      </Card>
    </div>
  );
}
