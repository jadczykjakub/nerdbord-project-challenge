'use client';

import React, { SetStateAction, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { handleFormSubmit } from '@lib/fileActions';
import { toast } from 'react-toastify';
import { Card } from '@nextui-org/react';

export default function Form({
  setRefetch,
}: {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, formAction] = useFormState(handleFormSubmit, null);

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);
      setRefetch((prev) => !prev);
    } else {
        toast.error(state?.message)
    }
  }, [state]);

  return (
    <Card className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:shadow-gray-700">
      <form action={formAction}>
        <label
          htmlFor="my-file"
          className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
        >
          Select file to upload
        </label>
        <input
          type="file"
          name="my-file"
          id="my-file"
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 mb-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400"
        >
          Upload
        </button>
      </form>
    </Card>
  );
}
