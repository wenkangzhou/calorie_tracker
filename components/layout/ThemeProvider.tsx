'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ReactNode, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      forcedTheme={mounted ? undefined : 'light'}
    >
      {children}
    </NextThemesProvider>
  );
}
