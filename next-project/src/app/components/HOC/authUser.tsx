import { createClientServer } from '@lib/db';
import { ReactNode, FC } from 'react';

interface AuthComponentProps {
  children?: ReactNode;
  [key: string]: any;
}

export function authUser<P extends AuthComponentProps>(Component: FC<P>) {
  return async function AuthComponent(props: P) {
    const supabase = createClientServer();

    const { data, error } = await supabase.auth.getUser();

    return <Component {...props} user={data?.user?.email} />;
  };
}
