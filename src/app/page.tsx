// src/app/page.tsx
import Image from 'next/image';
import AuthForm from './components/AuthForm'; // Assuming AuthForm is in src/app/components/
import type { Metadata } from 'next';

// --- Configuration ---
// Use the image from the public/images directory
// IMPORTANT: Ensure you have an image named 'photo-1511632765486-a01980e01a18.avif'
// inside the 'public/images/' folder of your project.
// The path starts with '/' because 'public' is served at the root.
const imageUrl = '/images/photo-1511632765486-a01980e01a18.avif';

// --- Placeholder ---
// A simple, small, base64 encoded gray SVG placeholder.
// You can generate your own here: https://png-pixel.com/ or use other tools.
// This is needed because Next.js can't auto-generate blurDataURLs for remote images
// or images referenced by path string (like we are doing here).
// If you were to *import* the image (`import myImage from '../../public/images/...'`),
// Next.js could potentially generate it automatically.
const placeholderImageBase64 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNjY2MiLz48L3N2Zz4=';


// --- Page Metadata (for SEO and browser tab) ---
export const metadata: Metadata = {
  title: 'Welcome | AI Chat Assistant',
  description: 'Login or Sign up to start chatting with our intelligent AI assistant.',
  // You can add more metadata like open graph tags if needed
};

// --- The Page Component ---
export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200"> {/* Subtle gradient background */}

      {/* Left Column: Image and Text Overlay */}
      {/* This column is hidden on screens smaller than 'md' */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative items-center justify-center p-12">
        {/* Background Image using next/image */}
        <Image
          src={imageUrl} // Use the local image path
          alt="People collaborating - representing conversation" // Update alt text if needed
          fill // Fills the parent container
          style={{ objectFit: 'cover' }} // Covers the area without distortion
          priority // Prioritize loading this image as it's likely visible on load
          className="absolute inset-0 z-0" // Position behind the overlay
          placeholder="blur" // Use the blur placeholder effect
          blurDataURL={placeholderImageBase64} // Provide the base64 data for the blur
          // For local images referenced by path string, width/height are not strictly required
          // when using `fill`, but Next.js might show warnings if it can't infer them.
          // If you encounter issues or warnings, you might need to import the image
          // or provide width/height props (though `fill` usually handles this).
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 opacity-70 z-10"></div>

        {/* Text Content */}
        <div className="relative z-20 text-white text-center max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight drop-shadow-md">
            Engage in Intelligent Conversations
          </h1>
          <p className="text-lg lg:text-xl mb-8 drop-shadow-sm">
            Sign in or create an account to explore the capabilities of our advanced AI chat assistant.
          </p>
          {/* Optional: Add a small icon or logo here */}
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      {/* Takes full width on small screens, half/less on larger screens */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8 sm:p-12">
        {/* The AuthForm component handles login/signup logic with Firebase */}
        <AuthForm />
      </div>

    </div>
  );
}
