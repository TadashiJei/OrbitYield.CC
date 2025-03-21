import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-md w-full text-center">
        <Image
          src="/404.avif"
          alt="404 - Page Not Found"
          width={600}
          height={400}
          className="mx-auto mb-8 rounded-lg shadow-lg"
          priority
        />
        
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8">
          <Button className="rounded-full" asChild>
            <Link href="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
