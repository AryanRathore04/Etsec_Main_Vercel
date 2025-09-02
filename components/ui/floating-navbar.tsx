"use client";

import React, { JSX, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Desktop: shrink and dim immediately when scrolling starts
  // We toggle classes via `isScrolled` for a reliable, immediate response.

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShrink = scrollY > 20;
      setIsScrolled(shouldShrink);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Navbar with Sheet (Header style) */}
      <header className="md:hidden fixed top-0 z-50 w-full border-b border-white/10 bg-white/5 supports-[backdrop-filter]:backdrop-blur-3xl backdrop-blur-3xl">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center mr-4">
            <Image
              src="/ETSEC.png"
              alt="ETSEC Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
              quality={100}
              unoptimized
            />
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Protected
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Desktop Floating Navbar */}
      <motion.div
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        whileHover={{
          scale: 1,
          opacity: 1,
          transition: { type: "spring", stiffness: 400, damping: 15 },
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ willChange: "transform, opacity, top" }}
        className={cn(
          "hidden md:flex max-w-5xl fixed inset-x-0 mx-auto rounded-full bg-white/5 dark:bg-black/40 border border-white/10 dark:border-white/12 z-[5000] pr-8 pl-8 items-center justify-center space-x-8 cursor-pointer supports-[backdrop-filter]:backdrop-blur-3xl backdrop-blur-3xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu",
          // Only apply scroll/hover classes after hydration
          hasMounted
            ? isHovering
              ? "scale-100 opacity-100 top-10 py-4 shadow-lg"
              : isScrolled
              ? "scale-95 opacity-80 top-6 py-3 shadow-md"
              : "scale-100 opacity-100 top-10 py-4 shadow-lg"
            : "scale-100 opacity-100 top-10 py-4 shadow-lg",
          className
        )}
      >
        {/* Desktop Logo */}
        <Link href="/" className="flex items-center mr-8">
          <Image
            src="/ETSEC.png"
            alt="ETSEC Logo"
            width={100}
            height={32}
            className="h-8 w-auto object-contain"
            priority
            quality={100}
            unoptimized
          />
        </Link>

        {navItems.map((navItem, idx) => (
          <Link
            key={`desktop-link-${idx}`}
            href={navItem.link}
            className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 text-base font-medium px-2"
          >
            <span className="hidden sm:block">{navItem.name}</span>
          </Link>
        ))}
        <Button className="border text-base font-semibold relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-8 py-2.5 rounded-full ml-4">
          Get Protected
        </Button>
      </motion.div>
    </>
  );
};
