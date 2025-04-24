// src/app/components/AuthForm.tsx
"use client";

import React, { useState, FormEvent } from 'react';
import { auth } from '@/app/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(`Attempting ${isLogin ? 'login' : 'signup'} for:`, email); // Add log

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful'); // Add log
        router.push('/chat');
      } else {
        console.log('Attempting createUserWithEmailAndPassword...'); // Add log
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Signup successful, user:', userCredential.user.uid); // Add log
        router.push('/chat');
      }
    } catch (err) {
      const authError = err as AuthError;
      // Log the detailed error in development for debugging
      console.error("Firebase Auth Error:", authError);
      console.error("Error Code:", authError.code);
      console.error("Error Message:", authError.message);


      // Existing user-friendly error mapping
      switch (authError.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password.');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already registered. Try logging in.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        // Add more specific cases if needed based on console output
        default:
          setError('Authentication failed. Please try again.');
          console.error("Unhandled Auth Error Code:", authError.code); // Log unhandled codes
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    // setEmail(''); // Optional: Clear fields on mode toggle
    // setPassword(''); // Optional: Clear fields on mode toggle
  };

  // --- Rest of the component (JSX) remains the same ---
  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              minLength={6} // Ensure this matches Firebase rules if set
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password (at least 6 characters)" // Update placeholder
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <p className="mt-2 text-center text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
            ) : null} {/* Simplified loading indicator logic */}
             {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
          </button>
        </div>

        <div className="text-sm text-center">
          <button
            type="button"
            onClick={toggleMode}
            disabled={loading}
            className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-70"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}
