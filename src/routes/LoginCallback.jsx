import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router'; // We will use this soon!
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function LoginCallback() {
  const [status, setStatus] = useState('Verifying your magic link...');
  const { verifyEmailLink } = useAuth();
  
  // Note: For now, since routing isn't set up, we'll just use window.location
  // Later we'll replace this with TanStack Router's useNavigate

  useEffect(() => {
    const handleSignIn = async () => {
      try {
        let email = window.localStorage.getItem('emailForSignIn');
        
        if (!email) {
          // If they opened the link on a different device, ask for email
          email = window.prompt('Please provide your email for confirmation');
        }

        if (email) {
          const user = await verifyEmailLink(email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          setStatus('Success! Logging you in...');
          
          // Check if they have a profile yet
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          
          setTimeout(() => {
            if (docSnap.exists()) {
               window.location.href = '/dashboard'; // Profile exists, go to dashboard
            } else {
               window.location.href = '/signup'; // No profile, go to onboarding
            }
          }, 1500);
        }
      } catch (error) {
        setStatus('Invalid or expired link. Please try logging in again.');
        console.error(error);
      }
    };

    handleSignIn();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-sakura-200 border-t-sakura-500 rounded-full animate-spin mx-auto"></div>
        <p className="text-zinc-600 font-medium">{status}</p>
      </div>
    </div>
  );
}