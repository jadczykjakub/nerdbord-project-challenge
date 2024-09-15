'use client';
import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@nextui-org/react';
import FileAddForm from '@components/FileAddForm';
import { Spinner } from '@nextui-org/react';

import {
  getAllFilesForUser,
  createSafeUrlToDownloadFile,
  deleteFile,
} from '@lib/fileActions';
import { toast } from 'react-toastify';
import Modal from '@components/Modal';
import FileItem from '@components/FileItem';

export default function FileHandling() {
  const [allFiles, setAllFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // Optional: Add a loading state
  const [refetch, setRefetch] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [urlToDownload, setUrlToDownload] = useState('');
  const [fileToDownload, setFileToDownload] = useState('');

  const handleDownload = async (fileName: string) => {
    const url = await createSafeUrlToDownloadFile(fileName);
    setUrlToDownload(url!);
    setFileToDownload(fileName);
    onOpen();
  };

  const handleDelete = async (fileName: string) => {
    const result = await deleteFile(fileName);

    if (result.status === 'success') {
      setLoading(true);

      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await getAllFilesForUser()) as string[];
        setAllFiles(data);
      } catch (error) {
        toast.error("Can't fetch files data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetch, loading]);

  
  return (
    <div className="grid gap-8 justify-items-center">
      {allFiles?.length > 3 && (
        <div>
          You have reached limit of file to download. Please delete and add new
        </div>
      )}
      {Number(allFiles?.length || 0) <= 3 && (
        <div>
          <FileAddForm setRefetch={setRefetch} />
        </div>
      )}

      {loading && <Spinner size="lg" />}

      {!loading && (
        <ul className="flex flex-wrap gap-4 justify-center">
          {allFiles?.map((item, index) => {
            return (
              <li key={index}>
                <FileItem
                  fileName={item}
                  handleDelete={handleDelete}
                  handleDownload={handleDownload}
                />
              </li>
            );
          })}
        </ul>
      )}
      <Modal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        urlToDownload={urlToDownload}
        fileName={fileToDownload}
      />
    </div>
  );
}
