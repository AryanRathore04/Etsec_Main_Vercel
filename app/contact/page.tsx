"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "motion/react";
import { useButtonAction } from "@/lib/button-actions";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Ripple } from "@/components/ui/ripple";
import {
  Phone,
  Mail,
  Shield,
  ArrowRight,
  Headphones,
  Send,
  Calendar,
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

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description:
      "Get detailed assistance with technical questions and product inquiries",
    contact: "contact@etsecinc.com",
    responseTime: "Within 2 hours",
    gradient: "from-cyan-500/20 to-blue-600/20",
    action: "Send Email",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Product implementation and troubleshooting assistance",
    contact: "contact@etsecinc.com",
    responseTime: "Within 4 hours",
    gradient: "from-purple-500/20 to-pink-600/20",
    action: "Get Help",
  },
];

function ContactPageContent() {
  const searchParams = useSearchParams();
  const reason = searchParams?.get("reason") || null;
  const section = searchParams?.get("section") || null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  // Update form based on URL parameters
  useEffect(() => {
    if (reason === "booking") {
      setFormData((prev) => ({
        ...prev,
        subject: "Book a Free Consultation Call",
        message:
          "Hi ETSEC Team,\n\nI'm interested in booking a free consultation call to discuss my cybersecurity needs.\n\nPlease let me know your availability.\n\nBest regards",
      }));
    } else if (reason === "protection") {
      setFormData((prev) => ({
        ...prev,
        subject: "Get Protected - Security Inquiry",
        message:
          "Hi ETSEC Team,\n\nI'm interested in learning more about your cybersecurity protection services for my organization.\n\nPlease provide more information about your solutions.\n\nBest regards",
      }));
    } else if (reason === "learn-more") {
      setFormData((prev) => ({
        ...prev,
        subject: "Learn More About ETSEC Services",
        message:
          "Hi ETSEC Team,\n\nI'd like to learn more about your cybersecurity services and solutions.\n\nCould you provide detailed information about your offerings?\n\nBest regards",
      }));
    } else if (reason === "consultation") {
      setFormData((prev) => ({
        ...prev,
        subject: "Schedule Security Consultation",
        message:
          "Hi ETSEC Team,\n\nI'd like to schedule a consultation to discuss custom security solutions for my business.\n\nPlease let me know your availability.\n\nBest regards",
      }));
    } else if (reason === "question") {
      setFormData((prev) => ({
        ...prev,
        subject: "Question About Cybersecurity",
        message:
          "Hi ETSEC Team,\n\nI have a question about:\n\n[Please describe your question]\n\nBest regards",
      }));
    } else if (reason === "subscribe") {
      setFormData((prev) => ({
        ...prev,
        subject: "Newsletter Subscription",
        message:
          "Hi ETSEC Team,\n\nI'd like to subscribe to your security updates and threat intelligence newsletter.\n\nPlease add me to your mailing list.\n\nBest regards",
      }));
    }
  }, [reason]);

  // Get dynamic heading based on URL parameters
  const getPageHeading = () => {
    if (reason === "booking") return "Book Your Free Consultation";
    if (reason === "protection") return "Get Protected Today";
    if (reason === "learn-more") return "Learn More About Our Services";
    if (reason === "consultation") return "Schedule a Security Consultation";
    if (reason === "question") return "Ask Our Security Experts";
    if (reason === "subscribe") return "Subscribe to Security Updates";
    if (section === "team") return "Meet Our Expert Team";
    return "Get In Touch";
  };

  const getPageSubtitle = () => {
    if (reason === "booking")
      return "Schedule a personalized consultation to discuss your cybersecurity needs";
    if (reason === "protection")
      return "Let us secure your digital assets with enterprise-grade protection";
    if (reason === "learn-more")
      return "Discover how our advanced security solutions can protect your business";
    if (reason === "consultation")
      return "Get expert advice on custom security strategies for your organization";
    if (reason === "question")
      return "Our cybersecurity experts are here to answer your questions";
    if (reason === "subscribe")
      return "Stay informed with the latest threat intelligence and security updates";
    if (section === "team")
      return "Connect with our world-class cybersecurity professionals";
    return "Fill out the form below and our team will get back to you within 2 hours";
  };

  // Button action handlers
  const handleSendMessage = useButtonAction("sendMessage");
  const handleEmailSupport = useButtonAction("emailSupport");
  const handleScheduleConsultation = useButtonAction("scheduleConsultation");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    });

    // Navigate to thank-you page
    if (typeof window !== "undefined") {
      router.push("/thank-you");
    }
  };

  const router = useRouter();

  return (
    <div className="flex flex-col bg-[#09090B] min-h-screen">
      {/* Hero Section with Ripple */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <Ripple
          mainCircleSize={400}
          mainCircleOpacity={0.08}
          numCircles={6}
          className="absolute inset-0"
        />

        <div className="container mx-auto max-w-5xl px-4 relative z-10 mt-4 sm:mt-0">
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
              <Phone className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300 font-medium">Get In Touch</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.9]"
            >
              {getPageHeading()}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {getPageSubtitle()}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            >
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 border-0 hover:scale-105 transition-transform">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Call
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-6 py-3"
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency Line
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-24 bg-[#09090B]">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="text-center space-y-6 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Multiple Ways to Connect
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-xl max-w-2xl mx-auto"
            >
              Choose the communication method that works best for your needs
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-white/5 border-white/10 p-6 h-full hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-0 space-y-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <method.icon className="h-8 w-8 text-white" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">
                        {method.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {method.description}
                      </p>

                      <div className="space-y-2">
                        <p className="text-cyan-400 font-medium">
                          {method.contact}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {method.responseTime}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        {method.action}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-[#09090B]">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-16"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  {reason === "booking"
                    ? "Book Your Consultation"
                    : reason === "protection"
                    ? "Get Protected Now"
                    : reason === "learn-more"
                    ? "Learn More"
                    : reason === "consultation"
                    ? "Schedule Consultation"
                    : reason === "question"
                    ? "Ask Your Question"
                    : reason === "subscribe"
                    ? "Subscribe to Updates"
                    : "Send Us a Message"}
                </h2>
                <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                  Fill out the form below and our team will get back to you
                  within 2 hours
                </p>
              </div>

              <Card className="bg-white/5 border-white/10 p-8 max-w-3xl mx-auto">
                <form
                  onSubmit={handleSubmit}
                  name="contact"
                  className="space-y-6 contact-form"
                >
                  {/* Honeypot anti-spam field (visually hidden) */}
                  <label
                    style={{
                      opacity: 0,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: 0,
                      width: 0,
                      zIndex: -1,
                      overflow: "hidden",
                    }}
                  >
                    Don’t fill this out if you're human:
                    <input
                      name="trap-field"
                      autoComplete="off"
                      tabIndex={-1}
                      onChange={() => {}}
                    />
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Full Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 86885 78412"
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Company
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your Company"
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your cybersecurity needs..."
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 text-lg hover:scale-105 transition-transform border-0"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    By submitting this form, you agree to our privacy policy and
                    terms of service.
                  </p>
                </form>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Information Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Other Ways to Connect
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Choose the communication method that works best for your needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Email Support */}
              <motion.div variants={itemVariants}>
                <Card
                  className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all duration-300 h-full cursor-pointer"
                  onClick={handleEmailSupport}
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto">
                      <Mail className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Email Support
                      </h3>
                      <p className="text-cyan-400 font-medium text-lg">
                        contact@etsecinc.com
                      </p>
                      <p className="text-gray-400 text-sm">
                        Response within 2 hours
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Sales Team */}
              <motion.div variants={itemVariants}>
                <Card
                  className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all duration-300 h-full cursor-pointer"
                  onClick={handleScheduleConsultation}
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto">
                      <Calendar className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Schedule Consultation
                      </h3>
                      <p className="text-green-400 font-medium text-lg">
                        Book a Call
                      </p>
                      <p className="text-gray-400 text-sm">
                        Custom security solutions
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Stats and Security Guarantee */}
            <div className="grid grid-cols-1 gap-8 mt-12">
              {/* Security Guarantee - full width now that stats were removed */}
              <motion.div variants={itemVariants}>
                <Card className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/20 p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        100% Secure Communication
                      </h3>
                      <p className="text-gray-300 text-sm">
                        All communications are encrypted and confidential
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#09090B]">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            className="text-center space-y-6 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Common Questions
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-xl max-w-2xl mx-auto"
            >
              Quick answers to frequently asked questions about our services
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              {
                question: "What cybersecurity services does ETSEC offer?",
                answer: (
                  <>
                    <p>
                      ETSEC offers a comprehensive suite of enterprise-grade
                      cybersecurity services designed to protect your
                      organization's digital assets. Core offerings include:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        Security Operations Center (SOC) setup, co-management,
                        and fully managed services
                      </li>
                      <li>Advanced Network Monitoring &amp; Detection</li>
                      <li>
                        Vulnerability Assessment &amp; Penetration Testing
                        (VAPT) for Web, Mobile, and IT Infrastructure
                      </li>
                      <li>Proactive Threat Intelligence &amp; Hunting</li>
                      <li>Malware Forensics &amp; Reverse Engineering</li>
                      <li>
                        Custom Open Source Intelligence (OSINT) investigations
                      </li>
                      <li>Incident Response Planning &amp; Execution</li>
                    </ul>
                  </>
                ),
              },
              {
                question:
                  "How does the engagement process work for cybersecurity services?",
                answer: (
                  <>
                    <p>
                      Our engagement process is structured for clarity and
                      efficiency:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        <strong>Initial Inquiry:</strong> You reach out with
                        your cybersecurity needs.
                      </li>
                      <li>
                        <strong>Scoping Call:</strong> We discuss requirements,
                        infrastructure, and objectives.
                      </li>
                      <li>
                        <strong>Proposal &amp; Quotation:</strong> You receive a
                        tailored service proposal and transparent quotation.
                      </li>
                      <li>
                        <strong>NDA &amp; Contract Signing:</strong> We
                        formalize scope, deliverables, timelines, and terms.
                      </li>
                      <li>
                        <strong>Service Initiation:</strong> We onboard your
                        team and begin the agreed services.
                      </li>
                    </ol>
                  </>
                ),
              },
              {
                question:
                  "Do you offer one-time security audits or only ongoing services?",
                answer: (
                  <>
                    <p>We offer both, depending on your needs:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>One-time assessments:</strong> Single-instance
                        VAPT, security audits, or forensic investigations.
                      </li>
                      <li>
                        <strong>Ongoing retainer-based services:</strong>{" "}
                        Managed SOC, recurring scans, and continuous threat
                        intelligence.
                      </li>
                    </ul>
                    <p>
                      We tailor the engagement model to your budget and security
                      posture.
                    </p>
                  </>
                ),
              },
              {
                question:
                  "How secure is my company's data with ETSEC during service delivery?",
                answer: (
                  <>
                    <p>
                      Data security and client confidentiality are paramount at
                      ETSEC. We ensure protection through:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Strict confidentiality:</strong> All staff are
                        bound by confidentiality agreements.
                      </li>
                      <li>
                        <strong>NDAs:</strong> Formal Non-Disclosure Agreements
                        with all clients before accessing sensitive data.
                      </li>
                      <li>
                        <strong>Compliance frameworks:</strong> Alignment with
                        ISO 27001, GDPR, and industry best practices.
                      </li>
                      <li>
                        <strong>Technical safeguards:</strong> Encrypted
                        communications, secure storage, and robust access
                        controls.
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                question:
                  "Can I request a custom service package tailored to my business needs?",
                answer: (
                  <>
                    <p>
                      Absolutely. Our services are modular and highly flexible.
                      Share your unique challenges and requirements, and we'll
                      craft a custom package aligned with your goals and budget.
                    </p>
                  </>
                ),
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white">
                      {faq.question}
                    </h3>
                    <div className="text-gray-300 leading-relaxed space-y-3">
                      {faq.answer}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Removed 'View All FAQs' button per request */}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#09090B]">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div
            className="text-center space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Don't Wait for a Breach
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-xl max-w-2xl mx-auto"
            >
              Take proactive steps to secure your business today. Our experts
              are ready to help.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 text-lg hover:scale-105 transition-transform border-0">
                <Shield className="w-5 h-5 mr-2" />
                Start Free Assessment
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency Line
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
