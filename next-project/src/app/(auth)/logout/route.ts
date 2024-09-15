import { type NextRequest } from 'next/server';

import { createClientServer } from '@lib/db';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const supabase = createClientServer();
  await supabase.auth.signOut();
  
  redirect('/login');
}
