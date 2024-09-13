import { signup } from '../actions';
import { Button, Input } from '@nextui-org/react';

export default function SignupPage() {
  return (
    <div>
      <h1>Sing up</h1>
      <form className="grid gap-2">
      <Input id="email" name="email" type="email" required  label="email" />
      <Input id="password" name="password" type="password" required  label="password"/>
      <Button color="primary" type='submit' formAction={signup}>
        Sign up
      </Button>
      </form>
    </div>
  );
}
