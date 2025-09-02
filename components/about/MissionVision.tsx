// MissionVision - Aceternity UI expandable cards with Magnetic hover
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Magnetic } from "@/components/ui/magnetic";
import { Target, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const missions = [
  {
    icon: Target,
    title: "Our Mission",
    summary:
      "Democratizing enterprise-grade cybersecurity for organizations of all sizes.",
    content:
      "To democratize enterprise-grade cybersecurity, making advanced threat protection accessible to organizations of all sizes while maintaining the highest standards of security excellence. We believe that robust cybersecurity should not be a privilege of large corporations, but a fundamental right of every business operating in the digital landscape.",
    gradient: "from-cyan-500/20 to-blue-600/20",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: Shield,
    title: "Our Vision",
    summary: "Creating a digital world where innovation thrives without fear.",
    content:
      "To create a digital world where innovation thrives without fear, where businesses can operate with complete confidence in their security infrastructure and data protection. We envision a future where cybersecurity becomes seamless, intelligent, and adaptive, allowing organizations to focus on their core mission while we protect their digital assets.",
    gradient: "from-blue-500/20 to-purple-600/20",
    borderColor: "border-blue-500/30",
  },
];

export function MissionVision() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const cardVariants = {
    collapsed: { height: "auto" },
    expanded: { height: "auto" },
  };

  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="py-24 bg-[#09090B]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {missions.map((item, index) => (
            <Magnetic key={index} intensity={0.2} range={150}>
              <motion.div
                variants={cardVariants}
                initial="collapsed"
                animate={expandedCard === index ? "expanded" : "collapsed"}
                className="group h-full"
              >
                <Card
                  className={`bg-white/5 ${item.borderColor} border p-8 h-full hover:bg-white/10 transition-all duration-500 cursor-pointer focus-within:ring-2 focus-within:ring-cyan-500/50`}
                  onClick={() => toggleCard(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleCard(index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={expandedCard === index}
                  aria-controls={`mission-content-${index}`}
                  aria-labelledby={`mission-title-${index}`}
                >
                  <CardContent className="p-0 space-y-6">
                    {/* Icon and Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center`}
                          whileHover={
                            prefersReducedMotion ? undefined : { scale: 1.1 }
                          }
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <h2
                          id={`mission-title-${index}`}
                          className="text-3xl font-bold text-white"
                        >
                          {item.title}
                        </h2>
                      </div>

                      <motion.button
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:ring-2 focus:ring-cyan-500/50"
                        whileHover={
                          prefersReducedMotion ? undefined : { scale: 1.1 }
                        }
                        whileTap={
                          prefersReducedMotion ? undefined : { scale: 0.95 }
                        }
                        aria-label={
                          expandedCard === index
                            ? "Collapse content"
                            : "Expand content"
                        }
                      >
                        {expandedCard === index ? (
                          <ChevronUp className="h-5 w-5 text-white" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-white" />
                        )}
                      </motion.button>
                    </div>

                    {/* Summary */}
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {expandedCard === index && (
                        <motion.div
                          id={`mission-content-${index}`}
                          variants={
                            prefersReducedMotion ? undefined : contentVariants
                          }
                          initial={
                            prefersReducedMotion ? "expanded" : "collapsed"
                          }
                          animate="expanded"
                          exit="collapsed"
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-gray-300 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
}
