import React from 'react';
import { InboxArrowDownIcon } from '@heroicons/react/24/solid';


export default function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4 dark:text-gray-100">
        Check your email to complete registration
      </h1>
      <div className='flex justify-center'><InboxArrowDownIcon className='h-40 w-40' /></div>
    </div>
  );
}
