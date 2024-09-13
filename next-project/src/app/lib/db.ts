import { Database } from './database.types';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables.');
}

export function createClientBrowser() {
  return createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );
}

export function createClientServer() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
