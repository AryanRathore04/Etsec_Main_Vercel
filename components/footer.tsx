import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18.244 2.25h3.513l-7.82 8.7L24 21.75h-7.35l-5.74-6.87-6.0 6.87H1.41l8.32-8.76L0 2.25h7.35l5.39 6.45 5.504-6.45z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/ETSEC.png"
                alt="ETSEC Logo"
                width={160}
                height={40}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                priority
                quality={100}
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Protecting your digital assets with cutting-edge cybersecurity
              solutions. Your trusted partner in the fight against cyber
              threats.
            </p>
            {/* Business Hours */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mt-2">
                Business Hours
              </h4>
              <ul className="text-muted-foreground text-sm mt-1 space-y-0.5">
                <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
                <li>Sat: 10:00 AM - 4:00 PM</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Services
              </Link>
              <Link
                href="/updates"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Latest Updates
              </Link>
              {/*
              <Link
                href="/gallery"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Gallery
              </Link>
              */}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/services/penetration-testing"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Penetration Testing
              </Link>
              <Link
                href="/services/security-audits"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Security Audits
              </Link>
              <Link
                href="/services/incident-response"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Incident Response
              </Link>
              <Link
                href="/services/consulting"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Security Consulting
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">
                  contact@etsecinc.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">
                  +91 86885 78412
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-13 w-13 text-primary" />
                <span className="text-muted-foreground text-sm">
                  401, Srinivasa Homes Road No 4A- Bandari Layout Vasanth Nagar
                  Colony, Nizampet Hyderabad, Telangana - 500090
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <XIcon className="h-5 w-5" />
                <span className="sr-only">X</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 ETSEC. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
