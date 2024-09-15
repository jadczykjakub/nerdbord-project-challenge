import { signup } from '../actions';
import { Button, Input, Card } from '@nextui-org/react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className='min-w-full'>
      <h1 className="text-2xl font-bold text-gray-900 mb-4 dark:text-gray-100">
        Sign up
      </h1>
      <div>
        <Card className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:shadow-gray-700 mt-12">
          <form className="grid gap-2">
            <Input
              id="email"
              name="email"
              type="email"
              required
              label="email"
            />
            <Input
              id="password"
              name="password"
              type="password"
              required
              label="password"
            />
            <Button color="primary" type="submit" formAction={signup}>
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
      </div>
    </div>
  );
}
