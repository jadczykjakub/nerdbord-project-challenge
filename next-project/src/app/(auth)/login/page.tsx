import { login } from '../actions';
import { Button, Input } from '@nextui-org/react';

export default function LoginPage() {
  return (
    <div>
      <h1>Sing in</h1>
      <form className="grid gap-2">
        <Input id="email" name="email" type="email" required label="email" />
        <Input
          id="password"
          name="password"
          type="password"
          required
          label="password"
        />
        <Button color="primary" type='submit' formAction={login}>
          Sign in
        </Button>
      </form>
    </div>
  );
}
