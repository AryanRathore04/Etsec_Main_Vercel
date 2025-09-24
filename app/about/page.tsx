"use client";

import { motion, useScroll, useTransform, useInView } from "motion/react";
import { easeOut } from "motion";
import { useRef } from "react";
import { useButtonAction } from "@/lib/button-actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundLines } from "@/components/ui/background-lines";
import {
  Shield,
  Target,
  Users,
  Award,
  ArrowRight,
  Building,
  Globe,
  Calendar,
  MapPin,
  Zap,
  Lock,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { MagicCard } from "@/components/ui/MagicCards";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

// Animated Number Component
function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {value}
        {suffix}
      </motion.span>
    </motion.span>
  );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Button action handlers
  const handleMeetTeam = useButtonAction("meetTeam");
  const handleGetProtected = useButtonAction("getProtected");
  const handleLearnMoreAbout = useButtonAction("learnMoreAbout");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Animated background lines */}
        <BackgroundLines
          className="absolute inset-0 z-0 h-full w-full"
          svgOptions={{ duration: 12 }}
        >
          <div className="hidden" />
        </BackgroundLines>

        <div className="container mx-auto px-6 max-w-6xl relative z-10 mt-[113px] sm:mt-0">
          <motion.div
            className="text-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="mb-6 px-4 py-2 text-sm font-medium border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
              >
                <Shield className="w-4 h-4 mr-2" />
                Protecting Digital Assets Since 2014
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
            >
              <span className="block text-white text-[0.94em] md:text-[0.96em] lg:text-[0.98em]">
                Cyber
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-[0.94em] md:text-[0.96em] lg:text-[0.98em]">
                Security
              </span>
              <span className="block text-gray-300 text-5xl md:text-6xl lg:text-7xl mt-2">
                Excellence
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Your trusted partner in cybersecurity excellence, combining
              cutting-edge solutions with comprehensive education.
            </motion.p>

            {/*
              Original hero stats block commented out per request. Keeping the
              JSX here for quick restoration if needed.

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-8 pt-8"
            >
              {[
                { icon: Building, label: "Est. 2014", value: "10+ Years" },
                { icon: Globe, label: "Global Reach", value: "50+ Countries" },
                { icon: Award, label: "Clients", value: "500+ Protected" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <stat.icon className="h-6 w-6 text-cyan-400" />
                  <div>
                    <div className="font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            */}

            {/* Replacement content block: concise mission + contact CTA */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center text-center gap-6 pt-8 max-w-3xl mx-auto"
            >
              <div className="px-6 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold text-white">
                  Our Commitment
                </h3>
                <p className="text-gray-300 mt-2">
                  We deliver tailored cybersecurity strategies that reduce risk,
                  enable compliance, and protect what matters most — your
                  people, systems, and data. We focus on measurable outcomes and
                  practical readiness.
                </p>
              </div>

    
            </motion.div>
          </motion.div>
        </div>
        {/* Scroll hint inside hero */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <a
            href="#overview"
            className="group flex flex-col items-center gap-2 text-gray-400 hover:text-cyan-300 transition-colors"
            aria-label="Scroll to explore"
          >
            <span className="text-sm tracking-wide">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </a>
        </div>
      </motion.section>

      {/* Bento Grid Layout */}
      <section id="overview" className="py-32 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Mission & Vision Bento */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* Mission - Large Card */}
            <motion.div
              className="lg:col-span-3 lg:row-span-2"
              variants={scaleInVariants}
            >
              <Card className="h-full p-12 bg-gradient-to-br from-gray-900/50 to-black border border-white/10 shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500">
                <CardContent className="p-0 h-full flex flex-col justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/30"
                  >
                    <Target className="h-8 w-8 text-cyan-400" />
                  </motion.div>

                  <motion.h2
                    className="text-4xl md:text-5xl font-bold text-white mb-6"
                    variants={slideInVariants}
                  >
                    Our Mission
                  </motion.h2>

                  <motion.p
                    className="text-xl text-gray-300 leading-relaxed"
                    variants={slideInVariants}
                  >
                    Our mission is to create a safer digital world by delivering
                    advanced, reliable, and customized cybersecurity solutions.
                    We empower businesses and critical sectors with expert
                    guidance, innovative technologies, and practical training to
                    detect, prevent, and respond to evolving threats, ensuring
                    operational continuity and trust in every digital
                    interaction
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision - Medium Card */}
            <motion.div className="lg:col-span-2" variants={scaleInVariants}>
              <Card className="h-full p-8 bg-gradient-to-br from-purple-900/30 to-black border border-white/10 shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-500">
                <CardContent className="p-0 h-full flex flex-col justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 border border-purple-500/30"
                  >
                    <Shield className="h-6 w-6 text-purple-400" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our vision is to be a global leader in cybersecurity,
                    satellite, and blockchain security services, known for our
                    commitment to excellence, continuous innovation, and trusted
                    partnerships. We aspire to protect the digital frontier
                    across industries, fostering a resilient, secure, and
                    future-ready digital ecosystem for all.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            {/* <motion.div
              className="lg:col-span-2 grid grid-cols-2 gap-4"
              variants={itemVariants}
            >
              {[
                { number: 500, suffix: "+", label: "Clients Protected" },
                { number: 99.9, suffix: "%", label: "Uptime SLA" },
                { number: 24, suffix: "/7", label: "SOC Monitoring" },
                { number: 10, suffix: "+", label: "Years Experience" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/50 p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-xl hover:border-cyan-500/30 transition-all duration-300"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    <AnimatedNumber value={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div> */}
          </motion.div>

          {/* Core Values Bento */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div
              className="md:col-span-2 lg:col-span-4 text-center mb-8"
              variants={itemVariants}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Core Values
              </h2>
              <p className="text-xl text-gray-300">
                The principles that drive our cybersecurity excellence
              </p>
            </motion.div>

            {[
              {
                title: "Excellence",
                description:
                  "Uncompromising quality in every security solution",
                icon: Award,
                gradient: "from-amber-900/30 to-orange-900/30",
                iconColor: "text-amber-400",
                iconBg: "bg-amber-500/20",
                borderColor: "border-amber-500/30",
              },
              {
                title: "Innovation",
                description: "Pioneering next-generation security technologies",
                icon: Zap,
                gradient: "from-cyan-900/30 to-blue-900/30",
                iconColor: "text-cyan-400",
                iconBg: "bg-cyan-500/20",
                borderColor: "border-cyan-500/30",
              },
              {
                title: "Integrity",
                description:
                  "Transparent practices and ethical security standards",
                icon: Lock,
                gradient: "from-green-900/30 to-emerald-900/30",
                iconColor: "text-green-400",
                iconBg: "bg-green-500/20",
                borderColor: "border-green-500/30",
              },
              {
                title: "Partnership",
                description: "Building lasting relationships through trust",
                icon: Users,
                gradient: "from-purple-900/30 to-pink-900/30",
                iconColor: "text-purple-400",
                iconBg: "bg-purple-500/20",
                borderColor: "border-purple-500/30",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={scaleInVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <MagicCard>
                  <Card className="relative h-full p-8 bg-white/5 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                    <CardContent className="p-0 text-center space-y-6">
                      <motion.div
                        className="w-16 h-16 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center mx-auto"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <value.icon className={`h-8 w-8 ${value.iconColor}`} />
                      </motion.div>

                      <h3 className="text-xl font-bold text-white">
                        {value.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </MagicCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Team Section */}
          <motion.div
            className="mb-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Heading + Description above cards */}
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              variants={slideInVariants}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Expert Security Team
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                World-class cybersecurity professionals with decades of combined
                experience protecting organizations worldwide.
              </p>
              <motion.div
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg rounded-xl w-fit border-0"
                  onClick={handleMeetTeam}
                >
                  Meet Our Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Team Members */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {[
                {
                  name: "Prashant Joshi",
                  role: "Managing Director",
                  image: "/prashant_sir.jpg",
                  // experience: "15+ years",
                  // location: "San Francisco",
                },
                {
                  name: "Atharva Prashant Joshi",
                  role: "Chief Executive Officer",
                  image: "/atharva_sir.jpg",
                  // experience: "12+ years",
                  // location: "New York",
                },
                {
                  name: "Abhash Mandal",
                  role: "Technical Lead",
                  image: "/abhash_sir_colourful.png",
                  // experience: "18+ years",
                  // location: "Washington DC",
                },
                // {
                //   name: "Alex Thompson",
                //   role: "Cloud Security Architect",
                //   image: "/professional-person-cloud-security-expert.png",
                //   experience: "10+ years",
                //   location: "Austin",
                // },
              ]
                .slice(0, 3)
                .map((member, index) => (
                  <motion.div
                    key={index}
                    variants={scaleInVariants}
                    whileHover={{ y: -6 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border border-white/10 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500 bg-gray-900/30">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-white text-lg mb-1">
                          {member.name}
                        </h3>
                        <p className="text-cyan-400 font-medium mb-3">
                          {member.role}
                        </p>
                        {/* <div className="flex justify-between text-sm text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {member.experience}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {member.location}
                          </div>
                        </div> */}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center bg-gradient-to-br from-gray-900/50 to-black rounded-3xl p-16 border border-white/10 shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="mb-6 px-4 py-2 border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Ready to Get Started?
              </Badge>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Secure Your Digital Future
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Join hundreds of organizations that trust ETSEC for their
              cybersecurity needs. Let's build an impenetrable digital fortress
              for your business.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg rounded-xl border-0"
                  onClick={handleGetProtected}
                >
                  Get Protected Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-cyan-500/50 px-8 py-4 text-lg rounded-xl"
                  onClick={handleLearnMoreAbout}
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
