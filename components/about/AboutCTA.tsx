// AboutCTA - Prominent CTA with ShimmerButton and AnimatedBeam accent
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { ArrowRight, Shield } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function AboutCTA() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section className="py-24 bg-[#09090B] relative overflow-hidden">
      {/* Background Animated Beams */}
      {!prefersReducedMotion && (
        <>
          <AnimatedBeam
            className="absolute left-10 top-0 w-1"
            duration={4}
            delay={0}
            gradientStartColor="#06b6d4"
            gradientStopColor="#3b82f6"
            pathOpacity={0.1}
          />
          <AnimatedBeam
            className="absolute right-20 top-0 w-1"
            duration={5}
            delay={1}
            gradientStartColor="#8b5cf6"
            gradientStopColor="#06b6d4"
            pathOpacity={0.1}
          />
          <AnimatedBeam
            className="absolute left-1/3 top-0 w-1"
            duration={6}
            delay={2}
            gradientStartColor="#3b82f6"
            gradientStopColor="#8b5cf6"
            pathOpacity={0.1}
          />
        </>
      )}

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <motion.div
          className="text-center space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300 font-medium">
                Ready to Get Started?
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Secure Your Digital Future
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Today
              </span>
            </h2>

            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Join hundreds of organizations that trust ETSEC for their
              cybersecurity needs. Let our experts protect what matters most to
              your business.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/contact">
              <ShimmerButton
                className="px-8 py-4 text-lg font-semibold"
                shimmerColor="#06b6d4"
                background="linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)"
              >
                <span className="flex items-center space-x-2">
                  <span>Get Protected Today</span>
                  <ArrowRight className="h-5 w-5" />
                </span>
              </ShimmerButton>
            </Link>

            <Link href="/updates">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg transition-all duration-300 hover:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/50"
              >
                Learn More About Our Services
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8"
          >
            {[
              { number: "500+", label: "Protected Organizations" },
              { number: "24/7", label: "Security Monitoring" },
              { number: "99.9%", label: "Uptime Guarantee" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center space-y-2 p-4 bg-white/5 rounded-xl border border-white/10"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                tabIndex={0}
                role="article"
                aria-label={`${stat.number} ${stat.label}`}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Call to Action Text */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-sm max-w-xl mx-auto"
          >
            Ready to experience enterprise-grade cybersecurity? Our team of
            experts is standing by to discuss your security needs and provide a
            customized protection strategy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
