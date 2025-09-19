import React from "react";
import ContentSection from "@/components/ui/content-section";

export const metadata = {
  title: "Privacy Policy - ETSEC",
  description: "Privacy policy for ETSEC Cyber Academy & Security Services",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-foreground pt-28 pb-20 print:bg-white print:text-black">
      <style>{`@media print { .no-print { display: none !important; } a[href]:after { content: "" !important; } }`}</style>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <div className="no-print lg:sticky lg:top-32">
              <div className="mb-6 p-4 bg-card rounded-md">
                <h2 className="text-sm font-semibold text-foreground mb-2">
                  Contents
                </h2>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <a href="#privacy-overview" className="hover:text-primary">
                      2. Privacy Policy (Overview)
                    </a>
                  </li>
                  <li>
                    <a href="#what-we-collect" className="hover:text-primary">
                      2.1 What We Collect
                    </a>
                  </li>
                  <li>
                    <a href="#how-we-use" className="hover:text-primary">
                      2.2 How We Use Your Information
                    </a>
                  </li>
                  <li>
                    <a href="#data-security" className="hover:text-primary">
                      2.3 Data Security
                    </a>
                  </li>
                  <li>
                    <a href="#sharing-of-data" className="hover:text-primary">
                      2.4 Sharing of Data
                    </a>
                  </li>
                  <li>
                    <a href="#your-rights" className="hover:text-primary">
                      2.5 Your Rights
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <div className="w-full lg:w-3/4">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                    Privacy Policy
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    Last Updated: [Insert Date]
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
                <h2 id="privacy-overview">2. Privacy Policy</h2>

                <h3 id="what-we-collect">2.1. What We Collect</h3>
                <p>We collect personal data including:</p>
                <ul>
                  <li>Name, email, and contact information</li>
                  <li>
                    Payment details (securely processed via third-party
                    gateways)
                  </li>
                  <li>IP address, user activity logs for analytics</li>
                </ul>

                <h3 id="how-we-use">2.2. How We Use Your Information</h3>
                <ul>
                  <li>
                    For service delivery, account management, course access
                  </li>
                  <li>For improving our platform via analytics</li>
                  <li>
                    For sending relevant updates, promotions (with opt-out
                    option)
                  </li>
                </ul>

                <h3 id="data-security">2.3. Data Security</h3>
                <p>
                  We implement industry-standard security measures to protect
                  your data. All payment and communication data are encrypted.
                </p>

                <h3 id="sharing-of-data">2.4. Sharing of Data</h3>
                <p>
                  We never sell your data. Information may be shared with
                  trusted third-party vendors only for service facilitation
                  (e.g., LMS hosting, payment processing).
                </p>

                <h3 id="your-rights">2.5. Your Rights</h3>
                <ul>
                  <li>Request a copy or deletion of your personal data</li>
                  <li>Opt-out from marketing communications</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
