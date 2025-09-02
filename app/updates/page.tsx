"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useButtonAction } from "@/lib/button-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Ripple } from "@/components/ui/ripple";
import {
  AlertTriangle,
  Calendar,
  Clock,
  Search,
  TrendingUp,
  Shield,
  Users,
  BookOpen,
  ArrowRight,
  Mail,
  Filter,
  Eye,
  Share2,
  Download,
  Bell,
  Zap,
  Lock,
  Globe,
} from "lucide-react";

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
  visible: { opacity: 1, y: 0 },
};

const featuredUpdate = {
  id: 1,
  title: "Zero-Day Vulnerability Alert: Immediate Action Required",
  excerpt:
    "Critical security vulnerability discovered in enterprise software affecting millions of users worldwide. Our security team has identified attack vectors and developed immediate countermeasures.",
  category: "Security Alert",
  date: "2024-01-15",
  readTime: "5 min read",
  urgent: true,
  views: "12.5K",
  trending: true,
};

const updates = [
  {
    id: 2,
    title: "2024 Global Threat Landscape Report",
    excerpt:
      "Comprehensive analysis of emerging cyber threats, attack patterns, and defense strategies observed in Q1 2024.",
    category: "Industry Insights",
    date: "2024-01-12",
    readTime: "8 min read",
    views: "8.2K",
    featured: false,
  },
  {
    id: 3,
    title: "AI-Powered Threat Detection Platform Launch",
    excerpt:
      "ETSEC unveils next-generation artificial intelligence platform for real-time threat detection and automated response.",
    category: "Company News",
    date: "2024-01-10",
    readTime: "4 min read",
    views: "5.7K",
    featured: false,
  },
  {
    id: 4,
    title: "Remote Work Security Best Practices 2024",
    excerpt:
      "Essential cybersecurity measures for distributed teams and remote workforce protection strategies.",
    category: "Security Tips",
    date: "2024-01-08",
    readTime: "6 min read",
    views: "9.1K",
    featured: false,
  },
  {
    id: 5,
    title: "Ransomware Evolution: New Attack Vectors",
    excerpt:
      "Analysis of sophisticated ransomware campaigns and advanced prevention methodologies for enterprise environments.",
    category: "Threat Analysis",
    date: "2024-01-05",
    readTime: "7 min read",
    views: "6.8K",
    featured: false,
  },
  {
    id: 6,
    title: "GDPR Compliance Updates for 2024",
    excerpt:
      "Critical changes to European data protection regulations and implementation guidelines for global organizations.",
    category: "Compliance",
    date: "2024-01-03",
    readTime: "5 min read",
    views: "4.3K",
    featured: false,
  },
];

const categories = [
  { name: "All", count: 6, icon: Globe, color: "cyan" },
  { name: "Security Alert", count: 1, icon: AlertTriangle, color: "red" },
  { name: "Industry Insights", count: 1, icon: TrendingUp, color: "blue" },
  { name: "Company News", count: 1, icon: Bell, color: "green" },
  { name: "Security Tips", count: 1, icon: Shield, color: "purple" },
  { name: "Threat Analysis", count: 1, icon: Zap, color: "orange" },
  { name: "Compliance", count: 1, icon: Lock, color: "gray" },
];

type UpdateCategory =
  | "Security Alert"
  | "Industry Insights"
  | "Company News"
  | "Security Tips"
  | "Threat Analysis"
  | "Compliance";

const updateColors: Record<UpdateCategory, string> = {
  "Security Alert":
    "from-red-500/20 to-pink-600/20 text-red-400 border-red-500/30",
  "Industry Insights":
    "from-blue-500/20 to-indigo-600/20 text-blue-400 border-blue-500/30",
  "Company News":
    "from-green-500/20 to-emerald-600/20 text-green-400 border-green-500/30",
  "Security Tips":
    "from-purple-500/20 to-pink-600/20 text-purple-400 border-purple-500/30",
  "Threat Analysis":
    "from-orange-500/20 to-red-600/20 text-orange-400 border-orange-500/30",
  Compliance:
    "from-gray-500/20 to-slate-600/20 text-gray-400 border-gray-500/30",
};

function getCategoryColor(category: string) {
  return (
    updateColors[(category as UpdateCategory) || "Compliance"] ||
    "from-gray-500/20 to-slate-600/20 text-gray-400 border-gray-500/30"
  );
}

export default function UpdatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Button action handlers
  const handleReadArticle = (articleId: string) =>
    useButtonAction("readFullArticle", articleId);
  const handleShareArticle = (articleId: string, platform?: string) =>
    useButtonAction("shareArticle", articleId, platform);
  const handleDownloadReport = (reportId: string) =>
    useButtonAction("downloadReport", reportId);
  const handleSubscribeUpdates = useButtonAction("subscribeUpdates");
  const handleFilterUpdates = (category: string) =>
    useButtonAction("filterUpdates", category);

  const filteredUpdates = updates.filter((update) => {
    const matchesCategory =
      selectedCategory === "All" || update.category === selectedCategory;
    const matchesSearch =
      update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col bg-[#09090B] min-h-screen">
      {/* Hero Section with Ripple */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <Ripple
          mainCircleSize={600}
          mainCircleOpacity={0.06}
          numCircles={8}
          className="absolute inset-0"
        />

        <div className="container mx-auto max-w-6xl px-4 relative z-10 mt-[113px] sm:mt-0">
          <motion.div
            className="text-center space-y-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3"
            >
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300 font-medium">
                Latest Intelligence
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9]"
            >
              Security
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Intelligence
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Stay ahead of emerging threats with real-time security insights,
              expert analysis, and actionable intelligence from our
              cybersecurity specialists.
            </motion.p>

            {/* Enhanced Search */}
            <motion.div
              variants={itemVariants}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search security updates, threats, insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters - Enhanced */}
      <section className="py-12 bg-[#09090B]">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Button
                    variant={
                      selectedCategory === category.name ? "default" : "outline"
                    }
                    size="lg"
                    onClick={() => {
                      setSelectedCategory(category.name);
                      handleFilterUpdates(category.name)();
                    }}
                    className={
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-6 py-3"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-500/30 px-6 py-3"
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                    <Badge className="ml-2 bg-white/10 text-white border-0">
                      {category.count}
                    </Badge>
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Alert */}
      <section className="py-16 bg-[#09090B]">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 mb-6"
            >
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h2 className="text-2xl font-bold text-white">
                Critical Security Alert
              </h2>
              {featuredUpdate.trending && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                  TRENDING
                </Badge>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-r from-red-500/10 to-orange-600/10 border-red-500/20 overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-square bg-gradient-to-br from-red-500/20 to-orange-600/20 flex items-center justify-center relative overflow-hidden">
                    <AlertTriangle className="h-24 w-24 text-red-400/60 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {featuredUpdate.urgent && (
                      <Badge className="absolute top-6 left-6 bg-red-500 text-white animate-pulse">
                        URGENT
                      </Badge>
                    )}

                    <div className="absolute bottom-6 left-6 flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-white/80 text-sm">
                        <Eye className="w-4 h-4" />
                        <span>{featuredUpdate.views}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-white/80 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{featuredUpdate.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-center space-y-6">
                    <div className="flex items-center space-x-4 flex-wrap gap-2">
                      <Badge
                        className={`bg-gradient-to-r ${getCategoryColor(
                          featuredUpdate.category
                        )} border-0`}
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {featuredUpdate.category}
                      </Badge>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {featuredUpdate.date}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">
                      {featuredUpdate.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed">
                      {featuredUpdate.excerpt}
                    </p>

                    <div className="flex gap-4">
                      <Button
                        className="bg-gradient-to-r from-red-500 to-orange-600 text-white border-0 hover:scale-105 transition-transform"
                        onClick={handleReadArticle(
                          featuredUpdate.id.toString()
                        )}
                      >
                        Read Full Alert
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                        onClick={handleShareArticle(
                          featuredUpdate.id.toString()
                        )}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Alert
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Recent Updates Grid */}
      <section className="py-16 bg-[#09090B]">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-4"
            >
              Latest Security Updates
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-300 text-lg">
              Stay informed with our latest threat intelligence and security
              insights
            </motion.p>
          </motion.div>

          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {filteredUpdates.map((update) => (
                <motion.div
                  key={update.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center relative overflow-hidden">
                      <Shield className="h-16 w-16 text-white/30 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      <Badge
                        className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColor(
                          update.category
                        )} border-0`}
                      >
                        {update.category}
                      </Badge>

                      <div className="absolute bottom-4 right-4 flex items-center space-x-1 text-white/80 text-sm">
                        <Eye className="w-4 h-4" />
                        <span>{update.views}</span>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{update.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{update.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                        {update.title}
                      </h3>

                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {update.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 p-0"
                          onClick={handleReadArticle(update.id.toString())}
                        >
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 hover:bg-white/10"
                            onClick={handleDownloadReport(update.id.toString())}
                          >
                            <BookOpen className="h-4 w-4 text-gray-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 hover:bg-white/10"
                            onClick={handleShareArticle(update.id.toString())}
                          >
                            <Share2 className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredUpdates.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Search className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                No updates found
              </h3>
              <p className="text-gray-300 text-lg">
                Try adjusting your search terms or category filter.
              </p>
            </motion.div>
          )}

          <motion.div
            className="mt-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 px-8 py-3"
            >
              Load More Updates
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-24 bg-[#09090B]">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div
            className="text-center space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
                <Bell className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300 font-medium">Stay Updated</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Never Miss a Critical Alert
              </h2>

              <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                Subscribe to our threat intelligence feed and get real-time
                security updates delivered directly to your inbox.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="max-w-md mx-auto space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Enter your email address"
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500"
                />
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 border-0 hover:scale-105 transition-transform"
                  onClick={handleSubscribeUpdates}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  10,000+ subscribers
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  No spam policy
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {[
                {
                  icon: AlertTriangle,
                  title: "Critical Alerts",
                  desc: "Immediate threat notifications",
                },
                {
                  icon: TrendingUp,
                  title: "Weekly Reports",
                  desc: "Industry trend analysis",
                },
                {
                  icon: Shield,
                  title: "Best Practices",
                  desc: "Expert security guidance",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 p-6 text-center"
                >
                  <feature.icon className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
