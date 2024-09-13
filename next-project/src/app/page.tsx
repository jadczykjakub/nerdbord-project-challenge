import { supabase } from './lib/db';

export default async function Page() {
  
  const { data: users } = await supabase.from('users').select();

  return (
    <div>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
