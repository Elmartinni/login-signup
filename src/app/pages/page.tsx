"use client"; // <-- Add this line

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // <-- Change this import
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase'; // <-- Adjust path if lib is outside app

export default function ChatPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/'); // Redirect to the root (landing page)
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>; // Basic loading state
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">Error: {error.message}</div>;
  }

  // Important: Only render content IF the user exists AFTER loading is false
  if (!user) {
    // This state occurs briefly during redirect or if auth fails post-load
    return <div className="flex justify-center items-center min-h-screen">Redirecting...</div>;
  }

  // Render chat interface only if user is authenticated
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Page</h1>
      <p className="mb-4">Welcome, {user.email}!</p>
      {/* Add your chat components here */}
      <button
        onClick={async () => {
            await auth.signOut();
            // router.push('/'); // Optional: Redirect after sign out is handled by useEffect now
        }}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}
