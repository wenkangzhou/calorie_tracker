'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, BarChart3, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function BottomNav() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { path: '/', label: t('nav.dashboard'), icon: Home },
    { path: '/search', label: t('nav.search'), icon: Search },
    { path: '/progress', label: t('nav.progress'), icon: BarChart3 },
    { path: '/profile', label: t('nav.profile'), icon: User },
  ];

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border safe-area-pb">
        <div className="max-w-md mx-auto flex items-center justify-around py-2">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="flex flex-col items-center justify-center px-4 py-2 rounded-lg text-muted-foreground"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border safe-area-pb">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                'flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all duration-200',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'w-6 h-6 transition-all duration-200',
                  isActive && 'scale-110'
                )}
              />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
