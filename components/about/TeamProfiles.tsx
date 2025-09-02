// TeamProfiles - Profile cards with next/image, Tilt on pointer move (disabled on touch/low perf)
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tilt } from "@/components/ui/tilt";
import { Calendar, MapPin } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Chief Security Officer",
    image: "/professional-woman-ceo.png",
    certifications: ["CISSP", "CISM", "CEH"],
    experience: "15+ years",
    location: "San Francisco, CA",
    bio: "Cybersecurity visionary with expertise in enterprise security architecture and threat intelligence.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Penetration Tester",
    image: "/professional-man-cybersecurity-expert.png",
    certifications: ["OSCP", "GPEN", "CISSP"],
    experience: "12+ years",
    location: "New York, NY",
    bio: "Ethical hacking specialist focused on identifying and mitigating advanced persistent threats.",
  },
  {
    name: "Dr. Emily Watson",
    role: "Security Research Director",
    image: "/professional-woman-security-researcher.png",
    certifications: ["PhD", "CISSP", "GCIH"],
    experience: "18+ years",
    location: "Washington, DC",
    bio: "Research leader developing next-generation security technologies and threat detection algorithms.",
  },
];

export function TeamProfiles() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
            Expert Security Team
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-xl max-w-3xl mx-auto"
          >
            World-class cybersecurity professionals with decades of combined
            experience
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <Tilt
                tiltMaxAngle={8}
                scale={1.02}
                speed={400}
                className="h-full"
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 h-full group-hover:shadow-2xl">
                  <CardContent className="p-0">
                    {/* Profile Image */}
                    <div className="aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center relative overflow-hidden">
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        priority={false}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rq5wcdwsd"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Profile Info */}
                    <div className="p-6 space-y-4">
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-cyan-400 font-medium">
                          {member.role}
                        </p>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-300 text-sm leading-relaxed text-center">
                        {member.bio}
                      </p>

                      {/* Experience & Location */}
                      <div className="flex justify-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{member.experience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{member.location}</span>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.certifications.map((cert, certIndex) => (
                          <Badge
                            key={certIndex}
                            className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs"
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
