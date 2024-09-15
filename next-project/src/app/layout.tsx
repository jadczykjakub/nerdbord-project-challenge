import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@components/ThemeProvider';
import Navigation from '@components/Navigation';
import ToastProvider from '@components/ToastProvider/ToastProvider';

export const metadata: Metadata = {
  title: 'Nerdboard 72h Challenge',
  description: '72h Challenge: Build Your Own Cloud Storage by Jakub Jadczyk',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-dvh">
        <ThemeProvider>
          <ToastProvider>
            <Navigation />
            <div className="grid justify-items-center items-start pt-6 text-center h-[calc(100vh-5rem)]">
              {children}
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
