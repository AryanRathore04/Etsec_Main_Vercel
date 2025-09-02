"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
  // Optional small dropdown/accordion content to show inside overlay
  content?: React.ReactNode;
};

interface Props {
  items: NavItem[];
}

// Brand mark removed per request; using ETSEC logo image only
function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="relative w-9 h-9 rounded-full bg-white/10 dark:bg-white/10 flex items-center justify-center overflow-hidden">
      <motion.span
        className="absolute h-[2px] w-5 bg-white"
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute h-[2px] w-5 bg-white"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute h-[2px] w-5 bg-white"
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

export default function MastercardNavbar({ items }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const numbered = useMemo(
    () =>
      items.map((it, i) => ({ ...it, num: String(i + 1).padStart(2, "0") })),
    [items]
  );

  // Determine current page label
  const currentLabel = useMemo(() => {
    const match = items.find((i) => i.href === pathname);
    return match?.label ?? "Home";
  }, [items, pathname]);

  useEffect(() => {
    const onScroll = () => {
      // Don't collapse on home page
      if (pathname === "/") {
        setCollapsed(false);
        return;
      }

      const threshold = Math.max(480, Math.round(window.innerHeight * 0.9));
      setCollapsed(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Corrected animation parameters for Framer Motion
  const optimizedSpring = { stiffness: 120, damping: 25 }; // Smoother spring animation
  const optimizedTransition = {
    duration: 0.3,
    ease: [0.4, 0.0, 0.2, 1] as const,
  }; // Smoother transition

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
        className="fixed left-1/2 -translate-x-1/2 top-6 z-[60]"
        aria-label="Main navigation"
      >
        <LayoutGroup id="floating-nav">
          <motion.div
            layout
            transition={{ ...optimizedSpring }}
            className={`grid items-center ${
              collapsed
                ? "grid-cols-[minmax(60px,auto)_1fr_minmax(40px,auto)] gap-1 px-2 sm:px-3"
                : "grid-cols-[auto_1fr_auto] gap-4 px-4 sm:px-6"
            } rounded-full bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg py-2`}
          >
            {/* Left: Logo */}
            <div className="flex items-center justify-start">
              <Link
                href="/"
                className="flex items-center text-white font-semibold"
              >
                <Image
                  src="/ETSEC.png"
                  alt="ETSEC Logo"
                  width={collapsed ? 70 : 100}
                  height={collapsed ? 22 : 32}
                  className={`${
                    collapsed ? "h-5" : "h-8"
                  } w-auto object-contain transition-all duration-300`}
                  priority
                  quality={100}
                />
              </Link>
            </div>

            {/* Center: Links (expanded) or Current Page (collapsed) */}
            <div className="min-w-0 flex justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {!collapsed ? (
                  <motion.div
                    key="links"
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={optimizedTransition}
                    className="hidden md:flex items-center gap-6"
                  >
                    {numbered.map((it) => (
                      <Link
                        href={it.href}
                        key={it.href}
                        className={`text-sm font-medium transition-colors ${
                          pathname === it.href
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {pathname === it.href ? (
                          <motion.span layoutId="current-label">
                            {it.label}
                          </motion.span>
                        ) : (
                          <span>{it.label}</span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="label"
                    layout
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={optimizedTransition}
                    className="flex items-center justify-center w-full overflow-hidden"
                  >
                    <span className="text-white/95 text-xs sm:text-sm font-medium whitespace-nowrap">
                      {currentLabel}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Hamburger */}
            <div className="flex justify-end items-center">
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex-shrink-0"
              >
                <Hamburger open={open} />
              </button>
            </div>
          </motion.div>
        </LayoutGroup>
      </motion.nav>

      {/* Overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[59] flex items-start justify-center px-2 sm:px-6 pt-24 pb-6"
          >
            {/* Dim background under rounded panel */}
            <div
              className="absolute inset-0 -z-10 bg-black/30"
              onClick={() => setOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={optimizedTransition}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-black/[0.06] overflow-hidden"
            >
              <div className="p-6 sm:p-10">
                {/* Header inside overlay */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/ETSEC.png"
                      alt="ETSEC Logo"
                      width={96}
                      height={28}
                      className="h-7 w-auto object-contain"
                      priority
                      quality={100}
                    />
                  </div>
                  <div className="text-sm text-black/60">
                    Goals | {String(items.length).padStart(2, "0")}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-black/[0.06]" />

                {/* Items list */}
                <ul className="divide-y divide-black/[0.06]">
                  {numbered.map((it, idx) => {
                    const isOpen = expanded === idx;
                    return (
                      <li key={it.href} className="py-4 sm:py-6">
                        <button
                          className="w-full flex items-center gap-3 sm:gap-6 text-left"
                          onClick={() =>
                            setExpanded((v) => (v === idx ? null : idx))
                          }
                          aria-expanded={isOpen}
                          aria-controls={`item-${idx}`}
                        >
                          <span className="w-10 sm:w-12 text-xs sm:text-sm tabular-nums text-black/40">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 text-xl sm:text-3xl font-semibold text-black">
                            {it.label}
                            <span className="align-super ml-2 text-xs bg-black/5 rounded-full px-2 py-0.5 text-black/50">
                              {String(3).padStart(2, "0")}
                            </span>
                          </span>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-black/60"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`item-${idx}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden pl-10 sm:pl-12 pr-2"
                            >
                              <div className="pt-3 sm:pt-4 pb-2 text-black/70 leading-relaxed">
                                {it.content ?? (
                                  <div className="text-sm sm:text-base">
                                    <p className="mb-2">
                                      Explore more about {it.label} and how we
                                      help you succeed.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                      <Link
                                        href={it.href}
                                        className="underline underline-offset-4"
                                      >
                                        Open {it.label}
                                      </Link>
                                      <Link
                                        href="#"
                                        className="text-black/60 hover:text-black"
                                      >
                                        Overview
                                      </Link>
                                      <Link
                                        href="#"
                                        className="text-black/60 hover:text-black"
                                      >
                                        Resources
                                      </Link>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
