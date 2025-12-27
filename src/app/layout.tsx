import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "loggerect - The React Logger That Gets You",
  description:
    "A powerful, highly configurable React logger with TypeScript decorators, environment-aware logging, and full source path tracking",
  keywords: [
    "react",
    "logger",
    "typescript",
    "decorator",
    "debugging",
    "console",
    "development",
    "loggerect",
  ],
  authors: [{ name: "loggerect" }],
  openGraph: {
    title: "loggerect - React Logging That Actually Works",
    description:
      "A powerful, zero-dependency logger with full source path tracking, TypeScript decorators, and environment-aware output.",
    type: "website",
    url: "https://loggerect.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "loggerect - React Logging That Actually Works",
    description:
      "A powerful, zero-dependency logger with full source path tracking, TypeScript decorators, and environment-aware output.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={`${outfit.className} antialiased`}>
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
