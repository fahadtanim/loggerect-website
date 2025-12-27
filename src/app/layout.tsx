import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "loggerect - The React Logger That Gets You",
  description: "A powerful, highly configurable React logger with TypeScript decorators, environment-aware logging, and full source path tracking",
  keywords: ["react", "logger", "typescript", "decorator", "debugging", "console", "development", "loggerect"],
  authors: [{ name: "loggerect" }],
  openGraph: {
    title: "loggerect - React Logging That Actually Works",
    description: "A powerful, zero-dependency logger with full source path tracking, TypeScript decorators, and environment-aware output.",
    type: "website",
    url: "https://loggerect.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "loggerect - React Logging That Actually Works",
    description: "A powerful, zero-dependency logger with full source path tracking, TypeScript decorators, and environment-aware output.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Load fonts via Google Fonts CDN (Babel-compatible) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased font-outfit">
        {/* Background effects */}
        <div className="bg-grid" />
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />
        <div className="bg-glow bg-glow-3" />
        
        {children}
      </body>
    </html>
  );
}
