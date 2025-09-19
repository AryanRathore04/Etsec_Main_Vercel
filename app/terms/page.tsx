import React from "react";
import ContentSection from "@/components/ui/content-section";

export const metadata = {
  title: "Terms & Conditions - ETSEC",
  description:
    "Terms and Conditions for ETSEC Cyber Academy & Security Services",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-foreground pt-28 pb-20 print:bg-white print:text-black">
      <style>{`@media print { .no-print { display: none !important; } a[href]:after { content: "" !important; } }`}</style>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: TOC - sticky on large screens */}
          <aside className="w-full lg:w-1/4">
            <div className="no-print lg:sticky lg:top-32">
              <div className="mb-6 p-4 bg-card rounded-md">
                <h2 className="text-sm font-semibold text-foreground mb-2">
                  Contents
                </h2>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <a href="#terms-overview" className="hover:text-primary">
                      1. Terms and Conditions (Overview)
                    </a>
                  </li>
                  <li>
                    <a href="#introduction" className="hover:text-primary">
                      1.1 Introduction
                    </a>
                  </li>
                  <li>
                    <a
                      href="#user-responsibilities"
                      className="hover:text-primary"
                    >
                      1.2 User Responsibilities
                    </a>
                  </li>
                  <li>
                    <a
                      href="#intellectual-property"
                      className="hover:text-primary"
                    >
                      1.3 Intellectual Property
                    </a>
                  </li>
                  <li>
                    <a href="#payments-refunds" className="hover:text-primary">
                      1.4 Payments &amp; Refunds
                    </a>
                  </li>
                  <li>
                    <a
                      href="#limitation-of-liability"
                      className="hover:text-primary"
                    >
                      1.5 Limitation of Liability
                    </a>
                  </li>
                  <li>
                    <a href="#termination" className="hover:text-primary">
                      1.6 Termination
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Right column: Content card */}
          <div className="w-full lg:w-3/4">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                    Terms &amp; Conditions
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    Last Updated: [20-09-2025]
                  </p>
                </div>
                <div className="no-print">
                  <a
                    href="#top"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Back to top
                  </a>
                </div>
              </div>

              <section className="prose dark:prose-invert text-sm max-w-none space-y-4">
                <h2 id="terms-overview">
                  1. Terms and Conditions (for both Academy &amp; Cybersecurity
                  Services)
                </h2>

                <h3 id="introduction">1.1. Introduction</h3>
                <p>
                  Welcome to ETSEC Cyber Academy and Security Solutions. These
                  Terms and Conditions govern your access to and use of our
                  training courses, services, tools, and platform. By accessing
                  our website or enrolling in our programs/services, you agree
                  to these terms.
                </p>

                <h3 id="user-responsibilities">1.2. User Responsibilities</h3>
                <ul>
                  <li>
                    You must be at least 16 years old or have parental/guardian
                    consent.
                  </li>
                  <li>
                    You agree not to misuse any materials or services for
                    illegal or unethical activities.
                  </li>
                  <li>
                    You shall not reproduce, resell, or share proprietary
                    content without written permission.
                  </li>
                </ul>

                <h3 id="intellectual-property">1.3. Intellectual Property</h3>
                <p>
                  All content—including courses, tools, reports, templates, and
                  guides—are the intellectual property of ETSEC. Unauthorized
                  use, copying, or redistribution is prohibited.
                </p>

                <h3 id="payments-refunds">1.4. Payments &amp; Refunds</h3>
                <p>
                  Fees for courses and services must be paid upfront or as per a
                  specified schedule.
                </p>
                <p>
                  Refunds for academy courses may be issued within 7 days of
                  enrollment, if less than 10% of the course is completed. No
                  refunds for services after delivery unless stated otherwise in
                  a contract.
                </p>

                <h3 id="limitation-of-liability">
                  1.5. Limitation of Liability
                </h3>
                <p>
                  ETSEC shall not be held responsible for any damage, loss, or
                  incident resulting from the use of its services or training
                  unless proven to be due to gross negligence.
                </p>

                <h3 id="termination">1.6. Termination</h3>
                <p>
                  We reserve the right to terminate or restrict your access for
                  violations of these terms or misuse of our services.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
