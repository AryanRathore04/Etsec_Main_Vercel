// CoreValues - Uniform tiles grid with AnimatedBeam on hover, keyboard accessible
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Award, Zap, Shield, Users } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const values = [
  {
    title: "Excellence",
    description: "Uncompromising quality in every security solution we deliver",
    icon: Award,
    color: "cyan",
    gradient: "from-cyan-500/20 to-cyan-600/20",
  },
  {
    title: "Innovation",
    description:
      "Pioneering next-generation security technologies and methodologies",
    icon: Zap,
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/20",
  },
  {
    title: "Integrity",
    description:
      "Transparent practices and unwavering ethical security standards",
    icon: Shield,
    color: "purple",
    gradient: "from-purple-500/20 to-purple-600/20",
  },
  {
    title: "Partnership",
    description:
      "Building lasting relationships through trust, collaboration, and results",
    icon: Users,
    color: "green",
    gradient: "from-green-500/20 to-green-600/20",
  },
];

export function CoreValues() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [focusedCard, setFocusedCard] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const showBeam = (index: number) =>
    hoveredCard === index || focusedCard === index;

  return (
    <section className="py-24 bg-[#09090B]">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center space-y-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Core Values
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-xl max-w-2xl mx-auto"
          >
            The principles that drive our cybersecurity excellence
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={prefersReducedMotion ? undefined : { y: -10 }}
            >
              <Card
                className="bg-white/5 border-white/10 p-6 h-full hover:bg-white/10 transition-all duration-300 relative overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500/50"
                tabIndex={0}
                onFocus={() => setFocusedCard(index)}
                onBlur={() => setFocusedCard(null)}
                role="article"
                aria-labelledby={`value-title-${index}`}
                aria-describedby={`value-desc-${index}`}
              >
                {/* Animated Beam - appears on hover/focus */}
                {showBeam(index) && !prefersReducedMotion && (
                  <AnimatedBeam
                    className="absolute inset-0 opacity-30"
                    duration={2}
                    gradientStartColor={`var(--${value.color}-500)`}
                    gradientStopColor={`var(--${value.color}-400)`}
                    pathWidth={2}
                  />
                )}

                <CardContent className="p-0 text-center space-y-4 relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto`}
                    whileHover={
                      prefersReducedMotion ? undefined : { scale: 1.1 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <value.icon className={`h-8 w-8 text-${value.color}-400`} />
                  </motion.div>

                  <h3
                    id={`value-title-${index}`}
                    className="text-xl font-bold text-white"
                  >
                    {value.title}
                  </h3>

                  <p
                    id={`value-desc-${index}`}
                    className="text-gray-300 leading-relaxed"
                  >
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
