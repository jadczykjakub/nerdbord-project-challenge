'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = () => {
    router.push('/logout');
  };
  return <button onClick={() => handleSignOut()}>sign out</button>;
}
