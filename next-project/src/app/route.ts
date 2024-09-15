import { type NextRequest } from 'next/server';

import { createClientServer } from '@lib/db';
import { redirect } from 'next/navigation';
import { getUserEmail as isAuth } from '@lib/getUserEmail';

export async function GET(request: NextRequest) {
  const isAuthUser = await isAuth();

  if(isAuthUser){
    redirect('dashboard')
  }

  isAuthUser ? redirect('dashboard') : redirect('/login');
}
