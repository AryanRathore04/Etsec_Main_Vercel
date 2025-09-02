'use client';

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page Not Found</p>
        <Link href="/" className="text-blue-500 hover:text-blue-300">
          Return Home
        </Link>
      </div>
    </div>
  );
}
