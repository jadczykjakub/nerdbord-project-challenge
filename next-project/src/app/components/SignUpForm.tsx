'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Card } from '@nextui-org/react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { signup } from '@lib/userActions';
import { toast } from 'react-toastify';

export default function SignUpForm() {
  const [state, formAction] = useFormState(signup, null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);
      setLoading(false);
    } else {
      toast.error(state?.message);
      setLoading(false);
    }
  }, [state]);
  

  return (
    <Card className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:shadow-gray-700 mt-12 ">
      <form className="grid gap-2  max-w-full" action={formAction} onSubmit={() => {setLoading(true)}}>
        <Input id="email" name="email" type="email" required label="email" />
        <Input
          id="password"
          name="password"
          type="password"
          required
          label="password"
        />
        <Button color="primary" type="submit" disabled={loading} isLoading={loading}>
          Sign up
        </Button>
      </form>

      <div className="mt-6 grid gap-4">
        You have an account?
        <Link href={'/login'}>
          <Button> Log in</Button>
        </Link>
      </div>
    </Card>
  );
}
