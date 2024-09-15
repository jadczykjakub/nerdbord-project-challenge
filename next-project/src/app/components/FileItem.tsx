import React from 'react';
import { Button, Card } from '@nextui-org/react';
import { ArrowDownIcon, TrashIcon } from '@heroicons/react/24/solid';

interface IFileItem {
  fileName: string;
  handleDownload: (name: string) => Promise<void>;
  handleDelete: (name: string) => Promise<void>;
}

export default function FileItem({
  fileName,
  handleDelete,
  handleDownload,
}: IFileItem) {
  return (
    <>
      <Card className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:shadow-gray-700">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {fileName}
        </p>
        <div className="flex justify-between gap-4">
          <Button
            onClick={() => handleDownload(fileName)}
            color="primary"
            className="flex items-center gap-2"
          >
            <ArrowDownIcon className="h-5 w-5" />
            Download
          </Button>
          <Button
            onClick={() => handleDelete(fileName)}
            color="danger"
            className="flex items-center gap-2"
          >
            <TrashIcon className="h-5 w-5" />
            Delete
          </Button>
        </div>
      </Card>
    </>
  );
}
