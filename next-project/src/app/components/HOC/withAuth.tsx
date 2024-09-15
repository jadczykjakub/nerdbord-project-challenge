import { redirect } from 'next/navigation';
import { createClientServer } from '@lib/db';
import { ReactNode, FC } from 'react';

interface AuthComponentProps {
  children?: ReactNode;
  [key: string]: any;
}

export function withAuth<P extends AuthComponentProps>(Component: FC<P>) {
  return async function AuthComponent(props: P) {
    const supabase = createClientServer();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect('/login');
    }

    return <Component {...props} user={data?.user.email} />;
  };
}
