// ImpactStats - 4 stat cards with AnimatedNumber triggered by InView
"use client";

import { motion } from "motion/react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { InView } from "@/components/ui/in-view";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const stats = [
  {
    number: 500,
    suffix: "+",
    label: "Protected Clients",
    description: "Organizations secured worldwide",
    color: "cyan",
  },
  {
    number: 10,
    suffix: "+",
    label: "Years Excellence",
    description: "Proven cybersecurity expertise",
    color: "blue",
  },
  {
    number: 24,
    suffix: "/7",
    label: "SOC Monitoring",
    description: "Continuous threat surveillance",
    color: "purple",
  },
  {
    number: 99.9,
    suffix: "%",
    label: "Uptime SLA",
    description: "Industry-leading availability",
    color: "green",
  },
];

export function ImpactStats() {
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
            Our Impact
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-xl max-w-2xl mx-auto"
          >
            Measurable results that demonstrate our commitment to cybersecurity
            excellence
          </motion.p>
        </motion.div>

        <InView threshold={0.2}>
          {(inView) => (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center space-y-3 group"
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.05 }
                  }
                  tabIndex={0}
                  role="article"
                  aria-labelledby={`stat-label-${index}`}
                  aria-describedby={`stat-desc-${index}`}
                >
                  <div className="relative">
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      {inView ? (
                        <AnimatedNumber
                          value={stat.number}
                          duration={1200}
                          suffix={stat.suffix}
                          formatter={(value) => {
                            // Handle decimal formatting for percentage
                            if (stat.suffix === "%") {
                              return value.toFixed(1);
                            }
                            return Math.floor(value).toString();
                          }}
                        />
                      ) : (
                        `0${stat.suffix}`
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <div
                    id={`stat-label-${index}`}
                    className="text-white font-bold text-lg"
                  >
                    {stat.label}
                  </div>

                  <p id={`stat-desc-${index}`} className="text-gray-300">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </InView>
      </div>
    </section>
  );
}
