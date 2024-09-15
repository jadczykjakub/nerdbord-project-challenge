import { login } from '../actions';
import { Button, Input, Card } from '@nextui-org/react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className='min-w-full'>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4 dark:text-gray-100">
          72h Challenge: Build Your Own Cloud Storage
        </h1>
      </div>
      <Card className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:shadow-gray-700 mt-12 ">
        <form className="grid gap-2  max-w-full">
          <Input id="email" name="email" type="email" required label="email"  />
          <Input
            id="password"
            name="password"
            type="password"
            required
            label="password"
            fullWidth
          />
          <Button color="primary" type="submit" formAction={login}>
            Log in
          </Button>
        </form>

        <div className="mt-6 grid gap-4">
          You dont have an accout?
          <Link href={'/signup'}>
            <Button> Sign up</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
