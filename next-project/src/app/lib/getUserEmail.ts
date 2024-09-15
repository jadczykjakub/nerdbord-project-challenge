import { createClientServer } from '@lib/db';

export async function getUserEmail() {
  const supabase = createClientServer();
  const { data } = await supabase.auth.getUser();
  return data?.user?.email;
}