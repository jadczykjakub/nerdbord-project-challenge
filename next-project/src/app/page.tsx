import Link from 'next/link';
import { Button } from '@nextui-org/react';

export default async function Page() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4 dark:text-gray-100">
          72h Challenge: Build Your Own Cloud Storage
        </h1>
      </div>

      <div className="flex gap-4 justify-around">
        <Link href={'/login'}>
          <Button>Login</Button>
        </Link>
        <Link href={'/signup'}>
          <Button> Sign up</Button>
        </Link>
      </div>
    </div>
  );
}
