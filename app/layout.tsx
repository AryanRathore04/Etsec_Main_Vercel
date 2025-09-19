import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import PageTransition from "@/components/ui/page-transition";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { ScrollToTopOnMount } from "@/components/ui/scroll-to-top-on-mount";

// Optimized to use only one font for better performance
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ETSEC Inc.",
  description:
    "Empowering your business with cutting-edge cybersecurity solutions and expert training programs. Together, we build a safer digital future.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/etsec-logo-icon.png",
    apple: "/etsec-logo-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`font-sans ${inter.variable} antialiased bg-[#09090B]`}
        suppressHydrationWarning
      >
        <ScrollToTopOnMount />
        <PerformanceMonitor />
        <div className="min-h-screen flex flex-col bg-[#09090B]">
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
