"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#040405] via-[#09090B] to-[#041022] py-20">
      <div className="max-w-3xl w-full mx-auto p-8 md:p-12 bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-4 rounded-full bg-gradient-to-r from-green-400/20 to-cyan-400/20">
            <CheckCircle className="w-16 h-16 text-cyan-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-200">
            Thank you!
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl">
            We received your message and our team will get back to you within 24
            hours. For urgent requests call us at{" "}
            <strong>+91 86885 78412</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
            >
              Back to Home
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white bg-white/5 hover:bg-white/10"
            >
              View Services
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            We respect your privacy. By contacting us you agree to our privacy
            policy.
          </p>
        </div>
      </div>
    </div>
  );
}
