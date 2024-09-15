import SignUpForm from '@components/SignUpForm';
import { signup } from '@lib/userActions';
import { Button, Input, Card } from '@nextui-org/react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 dark:text-gray-100">
        Sign up
      </h1>
      <div>
        <SignUpForm />
      </div>
    </div>
  );
}
