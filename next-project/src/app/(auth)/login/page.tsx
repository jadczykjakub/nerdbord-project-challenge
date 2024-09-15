import LoginForm from '@components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-w-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4 dark:text-gray-100">
          72h Challenge: Build Your Own Cloud Storage
        </h1>
      </div>
      <LoginForm />
    </div>
  );
}
