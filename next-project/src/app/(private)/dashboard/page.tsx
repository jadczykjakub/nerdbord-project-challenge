import { withAuth } from '@components/HOC/withAuth';
import FileHandling from '@components/FileHandling';

function Page({ user }: { user: string }) {
  return (
    <div className="grid gap-8 w-dvw ">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4 dark:text-gray-100">
          Welcome to your cloud storage
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">{user}</p>
      </div>

      <FileHandling />
    </div>
  );
}

export default withAuth(Page);
