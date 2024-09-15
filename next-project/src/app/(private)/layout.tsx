import SignOut from '@components/SignOut';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative'>
      <div className='absolute right-0 -top-6 bg-primary px-2 py-1 rounded-bl-lg'>
        <SignOut />
      </div>
      {children}
    </div>
  );
}
