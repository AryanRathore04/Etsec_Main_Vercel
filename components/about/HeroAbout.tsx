// HeroAbout - Magic UI background with motion entry animation
"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Building, Globe, Award } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function HeroAbout() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const motionProps = prefersReducedMotion
    ? { initial: "visible", animate: "visible" }
    : { initial: "hidden", animate: "visible" };

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Magic UI Background - lazy loaded */}
      <BackgroundBeams className="absolute inset-0" />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <motion.div
          className="text-center space-y-10"
          variants={containerVariants}
          {...motionProps}
        >
          <motion.div variants={itemVariants}>
            <Badge className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 px-6 py-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="font-medium">
                Protecting Digital Assets Since 2014
              </span>
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
          >
            Cyber Defense
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We are cybersecurity pioneers, combining cutting-edge technology
            with human expertise to create impenetrable digital fortresses for
            modern enterprises.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 pt-6"
          >
            {[
              { icon: Building, label: "Founded 2014", color: "cyan" },
              { icon: Globe, label: "50+ Countries", color: "blue" },
              { icon: Award, label: "Industry Leader", color: "purple" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-xl px-6 py-3 focus-within:ring-2 focus-within:ring-cyan-500/50"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }
                }
                tabIndex={0}
                role="button"
                aria-label={stat.label}
              >
                <stat.icon className={`h-5 w-5 text-${stat.color}-400`} />
                <span className="text-white font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
