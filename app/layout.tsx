import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "Calorie Tracker - 卡路里追踪器",
  description: "A beautiful and functional calorie tracking application",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <div className="max-w-md mx-auto min-h-screen bg-background relative">
            {children}
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
