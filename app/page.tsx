"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useButtonAction } from "@/lib/button-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card as AnimatedCard,
  CardTitle as AnimatedCardTitle,
  CardDescription as AnimatedCardDescription,
  CardSkeletonContainer,
  ThreatDetectionSkeleton,
  AIAnalyticsSkeleton,
  TeamIntegrationSkeleton,
} from "@/components/ui/animated-card";
import {
  Shield,
  Lock,
  Eye,
  Zap,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { OptimizedBackground } from "@/components/ui/optimized-background";
import { Ripple } from "@/components/ui/ripple";
import { FlipWords } from "@/components/ui/flip-words";
import { BoxesCore } from "@/components/ui/background-boxes";
import { TextEffectPerChar } from "@/components/ui/text-effect-per-char";
import { DelayedFlipWords } from "@/components/ui/delayed-flip-words";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { SmoothTextReveal } from "@/components/ui/smooth-text-reveal";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { AnimatedHoverButton } from "@/components/ui/animated-hover-button";
import ContentSection from "@/components/ui/content-section";
import {
  AnimatedPageContent,
  AnimatedHero,
  AnimatedGrid,
  AnimatedGridItem,
  AnimatedSubtext,
  AnimatedSection,
} from "@/components/ui/animated-page-content";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CurvedBorderSvg, ChartSvg } from "@/components/icons";

export default function HomePage() {
  const [completedAnimations, setCompletedAnimations] = useState({
    badge: false,
    line1: false,
    line2: false,
    subtitle: false,
  });

  // Button action handlers
  const handleBookCall = useButtonAction("bookFreeCall");
  const handleLearnMore = useButtonAction("learnMore");
  const handleAskQuestion = useButtonAction("askQuestion");

  const handleAnimationComplete = (
    animationName: keyof typeof completedAnimations
  ) => {
    setCompletedAnimations((prev) => ({
      ...prev,
      [animationName]: true,
    }));
  };

  // Check if all text animations are complete for buttons
  const allTextAnimationsComplete =
    completedAnimations.badge &&
    completedAnimations.line1 &&
    completedAnimations.line2 &&
    completedAnimations.subtitle;

  return (
    <AnimatedPageContent className="flex flex-col bg-[#09090B]">
      {/* Hero Section - Optimized for Performance */}
      <section
        className="relative h-screen overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "#09090B" }}
      >
        {/* Ripple Background - appears with smooth animation */}
        <AnimatePresence>
          {allTextAnimationsComplete && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: -100,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 2.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 1.5, delay: 0.3 },
                scale: { duration: 2, delay: 0.5 },
                y: { duration: 2.5, ease: "easeOut" },
              }}
              className="absolute inset-0 z-0"
            >
              <Ripple
                mainCircleSize={800}
                mainCircleOpacity={0.15}
                numCircles={16}
                className="w-full h-full opacity-100"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text container - centered and above background */}
        <div className="container mx-auto max-w-4xl px-4 relative z-20 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8 flex flex-col items-center justify-center w-full mt-4 sm:mt-5 md:mt-0">
            {/* Animated Badge with accordion.net.au style */}
            <AnimatedHero delay={0}>
              <AnimatedBadge
                delay={0}
                onComplete={() => handleAnimationComplete("badge")}
              >
                Automate Smarter. Grow Faster. Win it!
              </AnimatedBadge>
            </AnimatedHero>

            {/* Heading with smooth text reveals */}
            <AnimatedHero delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-[0.9] tracking-tight text-center">
                <SmoothTextReveal
                  delay={200}
                  speed="ultra-fast"
                  className="block mb-6"
                  onComplete={() => handleAnimationComplete("line1")}
                >
                  Secure Your Digital
                </SmoothTextReveal>

                <SmoothTextReveal
                  delay={500}
                  speed="ultra-fast"
                  className="text-white"
                  onComplete={() => handleAnimationComplete("line2")}
                >
                  Future Today
                </SmoothTextReveal>
              </h1>
            </AnimatedHero>

            <AnimatedSubtext>
              <SmoothTextReveal
                delay={800}
                speed="ultra-fast"
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-sans text-center mt-4"
                onComplete={() => handleAnimationComplete("subtitle")}
              >
                Advanced cybersecurity solutions that protect your business from
                evolving threats with AI-powered detection and 24/7 monitoring.
              </SmoothTextReveal>
            </AnimatedSubtext>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <AnimatedHoverButton
                  delay={allTextAnimationsComplete ? 1200 : 1600}
                  containerClassName="w-auto"
                  className="px-2 py-1 text-sm h-9 sm:px-4 sm:py-2 sm:text-base sm:h-10 min-h-0"
                  duration={1.5}
                  clockwise={true}
                  onClick={handleBookCall}
                >
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    Book a Free Call
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </AnimatedHoverButton>

                <AnimatedButton
                  delay={allTextAnimationsComplete ? 1400 : 1800}
                  variant="ghost"
                  size="sm"
                  className="w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-6 text-base text-white hover:text-gray-900 border border-white/30 bg-white/10 hover:bg-white transition-colors"
                  onClick={handleLearnMore}
                >
                  Learn More
                </AnimatedButton>
              </div>
            </AnimatedSection>
          </div>
        </div>
        {/* <BoxesCore /> */}
      </section>

      {/* Why Choose Us Section with Animated Cards */}
      <section className="py-20" style={{ backgroundColor: "#09090B" }}>
        <div className="container mx-auto max-w-6xl px-4">
          <AnimatedHero className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Why Choose Us?
            </h2>
            <AnimatedSubtext>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
                Everything you need to automate, optimize, and scale your
                cybersecurity operations
              </p>
            </AnimatedSubtext>
          </AnimatedHero>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <AnimatedCard>
              <CardSkeletonContainer>
                <ThreatDetectionSkeleton />
              </CardSkeletonContainer>
              <AnimatedCardTitle>Real-Time Threat Detection</AnimatedCardTitle>
              <AnimatedCardDescription>
                Advanced AI-powered threat detection with instant response
                capabilities to protect your digital assets from emerging cyber
                threats.
              </AnimatedCardDescription>
            </AnimatedCard>

            <AnimatedCard>
              <CardSkeletonContainer>
                <AIAnalyticsSkeleton />
              </CardSkeletonContainer>
              <AnimatedCardTitle>AI-Powered Analytics</AnimatedCardTitle>
              <AnimatedCardDescription>
                Leverage cutting-edge artificial intelligence to analyze
                security patterns and provide predictive insights for proactive
                defense.
              </AnimatedCardDescription>
            </AnimatedCard>

            <AnimatedCard>
              <CardSkeletonContainer>
                <TeamIntegrationSkeleton />
              </CardSkeletonContainer>
              <AnimatedCardTitle>Seamless Team Integration</AnimatedCardTitle>
              <AnimatedCardDescription>
                Effortlessly integrate with your existing infrastructure and
                team workflows for minimal disruption and maximum security
                coverage.
              </AnimatedCardDescription>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        data-section="services"
        className="py-16 md:py-32"
        style={{ backgroundColor: "#09090B" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Smarter Services, Built with AI
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
              Everything you need to automate repetitive workflows across
              operations, marketing, sales, and customer support using AI and
              custom logic
            </p>
          </div>

          <div className="relative">
            <div className="relative z-10 grid grid-cols-6 gap-3">
              {/* Complete Training - Large feature card */}
              <Card
                className="relative col-span-full flex overflow-hidden lg:col-span-2"
                style={{
                  backgroundColor: "#09090B",
                  border: "1px solid #27272A",
                }}
              >
                <CardContent className="relative m-auto size-fit pt-6">
                  <div className="relative flex h-24 w-56 items-center justify-center">
                    <CurvedBorderSvg />
                    <span className="relative z-10 text-5xl font-semibold text-white flex items-center justify-center w-full h-full">
                      100%
                    </span>
                  </div>
                  <h2 className="mt-6 text-center text-3xl font-semibold">
                    Complete Training
                  </h2>
                </CardContent>
              </Card>

              {/* Personal Support - Medium card with icon */}
              <Card
                className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2"
                style={{
                  backgroundColor: "#09090B",
                  border: "1px solid #27272A",
                }}
              >
                <CardContent className="pt-6">
                  <div className="relative mx-auto flex aspect-square size-32 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                    <Eye className="m-auto h-fit w-12" strokeWidth={1} />
                  </div>
                  <div className="relative z-10 mt-6 space-y-2 text-center">
                    <h2 className="text-lg font-medium transition dark:text-white">
                      Personal Support
                    </h2>
                    <p className="text-foreground">
                      Dedicated security experts available 24/7 with
                      personalized support and rapid incident response
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Automation - Analytics style card */}
              <Card
                className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2"
                style={{
                  backgroundColor: "#09090B",
                  border: "1px solid #27272A",
                }}
              >
                <CardContent className="pt-6">
                  <div className="pt-6 lg:px-6">
                    <img
                      src="/production-line-98.svg"
                      alt="Production Line Automation"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <div className="relative z-10 mt-6 space-y-2 text-center">
                    <h2 className="text-lg font-medium transition">
                      Automate repetitive tasks
                    </h2>
                    <p className="text-foreground">
                      Streamline security operations with automated threat
                      detection, response workflows, and compliance reporting
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* SOAR Platform - Split layout with chart */}
              <Card
                className="card variant-outlined relative col-span-full overflow-hidden lg:col-span-3"
                style={{
                  backgroundColor: "#09090B",
                  border: "1px solid #27272A",
                }}
              >
                <CardContent className="grid pt-6 sm:grid-cols-2">
                  <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                    <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                      <Lock className="m-auto size-5" strokeWidth={1} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-lg font-medium text-zinc-800 transition dark:text-white">
                        SOAR Platform
                      </h2>
                      <p className="text-foreground">
                        Advanced Security Orchestration, Automation and Response
                        platform with intelligent workflows
                      </p>
                    </div>
                  </div>
                  <div className="rounded-tl-(--radius) relative -mb-6 -mr-6 mt-6 h-fit border-l border-t p-6 py-6 sm:ml-6">
                    <div className="absolute left-3 top-2 flex gap-1">
                      <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                      <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                      <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                    </div>
                    <ChartSvg />
                  </div>
                </CardContent>
              </Card>

              {/* Automated Workflows - Team collaboration style */}
              <Card
                className="card variant-outlined relative col-span-full overflow-hidden lg:col-span-3"
                style={{
                  backgroundColor: "#09090B",
                  border: "1px solid #27272A",
                }}
              >
                <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                  <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                    <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                      <Award className="m-auto size-6" strokeWidth={1} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-lg font-medium transition">
                        Automated Workflows
                      </h2>
                      <p className="text-foreground">
                        Custom security workflows that adapt to your business
                        needs with intelligent automation and machine learning
                      </p>
                    </div>
                  </div>
                  <div className="before:bg-(--color-border) relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px sm:-my-6 sm:-mr-6">
                    <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                      <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                        <span className="block h-fit rounded border border-white/20 px-2 py-1 text-xs shadow-sm text-white bg-white/5">
                          AI Logic
                        </span>
                        <div className="ring-background size-7 ring-4">
                          <div className="size-full rounded-full bg-cyan-500/20 dark:bg-cyan-500/10 flex items-center justify-center">
                            <Award className="size-4 text-cyan-400" />
                          </div>
                        </div>
                      </div>
                      <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                        <div className="ring-background size-8 ring-4">
                          <div className="size-full rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center">
                            <Lock className="size-4 text-white" />
                          </div>
                        </div>
                        <span className="block h-fit rounded border border-white/20 px-2 py-1 text-xs shadow-sm text-white bg-white/5">
                          Custom Rules
                        </span>
                      </div>
                      <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                        <span className="block h-fit rounded border border-white/20 px-2 py-1 text-xs shadow-sm text-white bg-white/5">
                          Smart Routing
                        </span>
                        <div className="ring-background size-7 ring-4">
                          <div className="size-full rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center">
                            <Zap className="size-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ETSEC Ecosystem Section */}
      <ContentSection />

      {/* FAQ Section */}
      <section className="py-20" style={{ backgroundColor: "#09090B" }}>
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4" />
              <span>FAQ'S</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Frequently Asked{" "}
              <span className="italic text-muted-foreground">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
              Find quick answers to the most common support questions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card
                className="p-6 text-center"
                style={{
                  backgroundColor: "#09090B",
                  border: "1px solid #27272A",
                }}
              >
                <div className="w-16 h-16 bg-white/10 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">
                  Still Have Questions?
                </h3>
                <p className="text-sm text-muted-foreground mb-4 font-sans">
                  Still have questions? Feel free to get in touch with us today!
                </p>
                <Button variant="outline" size="sm" onClick={handleAskQuestion}>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Ask A Question
                </Button>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem
                  value="processes"
                  className="rounded-lg px-6"
                  style={{
                    backgroundColor: "#09090B",
                    border: "1px solid #27272A",
                  }}
                >
                  <AccordionTrigger className="text-left font-heading hover:no-underline">
                    What types of processes can you automate?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-sans">
                    We specialize in automating repetitive workflows across
                    operations, marketing, sales, and customer support using AI
                    and custom logic.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="technical"
                  className="rounded-lg px-6"
                  style={{
                    backgroundColor: "#09090B",
                    border: "1px solid #27272A",
                  }}
                >
                  <AccordionTrigger className="text-left font-heading hover:no-underline">
                    Do I need technical knowledge to use your service?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-sans">
                    No technical knowledge required. Our team handles all the
                    technical implementation while you focus on your business
                    goals.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="integration"
                  className="rounded-lg px-6"
                  style={{
                    backgroundColor: "#09090B",
                    border: "1px solid #27272A",
                  }}
                >
                  <AccordionTrigger className="text-left font-heading hover:no-underline">
                    Can you integrate with our existing tools?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-sans">
                    Yes, we integrate with 500+ popular business tools and can
                    create custom integrations for your specific needs.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="implementation"
                  className="rounded-lg px-6"
                  style={{
                    backgroundColor: "#09090B",
                    border: "1px solid #27272A",
                  }}
                >
                  <AccordionTrigger className="text-left font-heading hover:no-underline">
                    How long does implementation take?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-sans">
                    Most implementations take 2-4 weeks depending on complexity.
                    We provide regular updates throughout the process.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="security"
                  className="rounded-lg px-6"
                  style={{
                    backgroundColor: "#09090B",
                    border: "1px solid #27272A",
                  }}
                >
                  <AccordionTrigger className="text-left font-heading hover:no-underline">
                    Is your AI secure and compliant?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-sans">
                    Yes, we maintain SOC 2 Type II compliance and follow
                    enterprise-grade security practices with end-to-end
                    encryption.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPageContent>
  );
}
