"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Shield, ChevronRight, Lock, Eye, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface CybersecNavbarProps {
  logo: string;
  logoAlt: string;
  items: NavItem[];
  activeHref?: string;
}

export default function CybersecNavbar({
  logo,
  logoAlt,
  items,
  activeHref,
}: CybersecNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#09090B]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-[#09090B]/80 backdrop-blur-sm"
        )}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, #09090B 0%, #0f0f23 100%)"
            : "linear-gradient(135deg, rgba(9, 9, 11, 0.8) 0%, rgba(15, 15, 35, 0.6) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  {/* Glowing background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-sm opacity-40"></div>

                  {/* Logo container */}
                  <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-[#09090B] to-[#1a1a2e] rounded-full border border-cyan-400/30 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent tracking-tight">
                    ETSEC
                  </span>
                  <span className="text-xs text-cyan-400/80 font-medium tracking-wider">
                    CYBERSECURITY
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        className={cn(
                          "relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 group",
                          activeHref === item.href
                            ? "text-cyan-400 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        )}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">{item.label}</span>

                        {/* Active indicator */}
                        {activeHref === item.href && (
                          <>
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-xl"
                              initial={false}
                              transition={{ duration: 0.3 }}
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-blue-500/20 rounded-xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            />
                          </>
                        )}

                        {/* Hover glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />

                        {/* Cyber grid pattern */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[length:10px_10px] rounded-xl"></div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="hidden md:block"
            >
              <Link href="/contact">
                <motion.button
                  className="relative px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl overflow-hidden group shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: "0 8px 32px rgba(6, 182, 212, 0.3)",
                  }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Get Protected</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>

                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 rounded-xl"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.05, 1], opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.button>
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="md:hidden relative p-3 text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#09090B]/98 backdrop-blur-xl border-t border-white/5"
              style={{
                background: "linear-gradient(135deg, #09090B 0%, #0f0f23 100%)",
              }}
            >
              <div className="px-4 py-6 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      <motion.div
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl transition-all duration-200",
                          activeHref === item.href
                            ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-400 border border-cyan-500/20"
                            : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                        )}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: items.length * 0.1 + 0.2 }}
                  className="pt-4 border-t border-white/10"
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <motion.button
                      className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-lg"
                      whileTap={{ scale: 0.98 }}
                      style={{
                        boxShadow: "0 8px 32px rgba(6, 182, 212, 0.3)",
                      }}
                    >
                      <Lock className="w-5 h-5" />
                      <span>Get Protected</span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-20"></div>
    </>
  );
}
