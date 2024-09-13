import Link from 'next/link';
import { Button } from '@nextui-org/react';

export default async function Page() {
  return (
    <div className="grid gap-6">
      <div>
        <h1>Welcome to Cloud Storage application</h1>
        <p>training purposes</p>
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
