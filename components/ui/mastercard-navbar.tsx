"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
  content?: React.ReactNode;
};

interface Props {
  items: NavItem[];
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="relative w-8 h-8 lg:w-7 lg:h-7 xl:w-9 xl:h-9 rounded-full bg-white/10 dark:bg-white/10 flex items-center justify-center overflow-hidden">
      <motion.span
        className="absolute h-[2px] w-4 xl:w-5 bg-white"
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute h-[2px] w-4 xl:w-5 bg-white"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute h-[2px] w-4 xl:w-5 bg-white"
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

  // Auto-close the hamburger menu when the route (pathname) changes
  useEffect(() => {
    if (open) {
      setOpen(false);
      setExpanded(null);
    }
  }, [pathname]);

  const numbered = useMemo(
    () =>
      items.map((it, i) => ({ ...it, num: String(i + 1).padStart(2, "0") })),
    [items]
  );

  const currentLabel = useMemo(() => {
    const match = items.find((i) => i.href === pathname);
    return match?.label ?? "Home";
  }, [items, pathname]);

  useEffect(() => {
    const onScroll = () => {
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

  const optimizedSpring = { stiffness: 120, damping: 25 };
  const optimizedTransition = {
    duration: 0.3,
    ease: [0.4, 0.0, 0.2, 1] as const,
  };
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
            className="flex items-center justify-between w-[92vw] sm:w-auto px-3 sm:px-4 md:px-5 lg:px-6 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg py-2"
          >
            {/* Left: Logo */}
            <div className="flex items-center justify-start flex-[1]">
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
                    collapsed
                      ? "h-5 md:h-4 lg:h-4 xl:h-5"
                      : "h-8 md:h-7 lg:h-7 xl:h-8"
                  } w-auto object-contain transition-all duration-300`}
                  priority
                  quality={100}
                />
              </Link>
            </div>

            {/* Center: Links / Label */}
            <div className="flex-[2] flex justify-center items-center overflow-x-auto touch-pan-x px-0 sm:px-4 md:px-4 xl:px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <AnimatePresence mode="wait" initial={false}>
                {collapsed ? (
                  <motion.div
                    key="label-collapsed"
                    layout
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={optimizedTransition}
                    className="flex items-center justify-center w-full overflow-hidden"
                  >
                    <span className="text-white/95 text-sm md:text-base font-medium whitespace-nowrap">
                      {currentLabel}
                    </span>
                  </motion.div>
                ) : (
                  <>
                    {/* XL: full links */}
                    <motion.div
                      key="links-xl"
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={optimizedTransition}
                      className="hidden xl:flex items-center whitespace-nowrap gap-2 md:gap-3 lg:gap-4 xl:gap-6"
                    >
                      {/* Desktop-only left spacer to avoid hugging the logo */}
                      <span
                        aria-hidden
                        className="hidden xl:block shrink-0 w-12"
                      />
                      {numbered.map((it) => (
                        <Link
                          href={it.href}
                          key={it.href}
                          className={`text-[12px] md:text-[13px] lg:text-[13px] xl:text-base font-medium transition-colors inline-flex items-center ${
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
                      {/* Desktop-only right spacer to avoid hugging the hamburger */}
                      <span
                        aria-hidden
                        className="hidden xl:block shrink-0 w-10"
                      />
                    </motion.div>

                    {/* Below XL: current label */}
                    <motion.div
                      key="label-subxl"
                      layout
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={optimizedTransition}
                      className="flex xl:hidden items-center justify-center w-full overflow-hidden"
                    >
                      <span className="text-white/95 text-sm md:text-base font-medium whitespace-nowrap">
                        {currentLabel}
                      </span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Hamburger */}
            <div className="flex items-center justify-end flex-[1]">
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

      {/* Overlay (unchanged) */}
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
                <div className="flex items-center justify-between mb-6">
                  <Image
                    src="/ETSEC.png"
                    alt="ETSEC Logo"
                    width={96}
                    height={28}
                    className="h-7 w-auto object-contain"
                    priority
                    quality={100}
                  />
                  <div className="text-sm text-black/60">
                    Goals | {String(items.length).padStart(2, "0")}
                  </div>
                </div>

                <div className="h-px bg-black/[0.06]" />

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
                          </span>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-black/60"
                          >
                            ▼
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
                                        onClick={() => {
                                          setOpen(false);
                                          setExpanded(null);
                                        }}
                                      >
                                        Open {it.label}
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
