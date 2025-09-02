import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/etsec-logo-icon.png"
                alt="ETSEC Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Protecting your digital assets with cutting-edge cybersecurity
              solutions. Your trusted partner in the fight against cyber
              threats.
            </p>
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
              <Link
                href="/gallery"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Gallery
              </Link>
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
                  contact@etsec.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">
                  New York, NY
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
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
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
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
