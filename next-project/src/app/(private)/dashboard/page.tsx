import { redirect } from 'next/navigation';

import { createClientServer } from '@lib/db';

export default async function PrivatePage() {
  const supabase = createClientServer();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Good to see you</h1>
      <p> {data.user.email}</p>
    </div>
  );
}
