'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClientServer } from '../../app/lib/db';

export async function login(currentState, formData: FormData) {
  const supabase = createClientServer();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { status: 'error', message: "Your credential are not correct" };
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}

export async function signup(currentState, formData: FormData) {
  const supabase = createClientServer();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  console.log(error)

  if (error) {
    if (error) {
      return { status: 'error', message: error.code };
    }
  }

  revalidatePath('/check-mail', 'layout');
  redirect('/check-mail');
}
