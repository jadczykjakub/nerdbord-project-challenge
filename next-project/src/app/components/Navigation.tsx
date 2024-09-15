import React from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher';
import { HomeIcon } from '@heroicons/react/24/solid';

function Navigation() {
  return (
    <div className="h-20 px-4 md:px8 bg-primary flex justify-between items-center w-full">
      <Link href={'/'}><HomeIcon className='w-10 h-10'/></Link>
      <ThemeSwitcher />
    </div>
  );
}

export default Navigation;
