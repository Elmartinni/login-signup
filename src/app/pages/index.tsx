
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import AuthForm from '../components/AuthForm';

// Replace with your actual image path or URL
// Option 1: Place an image in the `public` folder
//const imageUrl = '/images/chat-illustration.png';
// Option 2: Use an external URL (e.g., from Unsplash)
 const imageUrl = 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to AI Chat</title>
        <meta name="description" content="Login or Sign up to chat with our AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen bg-gray-100">
        {/* Left Column - Image */}
        {/* Hidden on small screens (md:block) */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 relative">
          {/* Using next/image for optimization */}
          <Image
            src={imageUrl}
            alt="AI Chat Illustration"
            layout="fill" // Makes the image fill the container
            objectFit="cover" // Scales the image while preserving aspect ratio
            priority // Load image faster as it's above the fold
          />
          {/* Optional: Add an overlay for text */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-75"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Intelligent Conversations</h1>
              <p className="text-lg lg:text-xl">
                  Engage with our advanced AI. Sign in or create an account to start chatting.
              </p>
          </div>
        </div>

        {/* Right Column - Auth Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8 sm:p-12">
          <AuthForm />
        </div>
      </div>
    </>
  );
};

export default Home;
