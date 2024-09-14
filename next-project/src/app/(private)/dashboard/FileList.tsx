'use client';

import React, { useEffect, useState } from 'react';
import { getListObjectsForUser, createSafeUrlToDownloadFile } from './actions';
import Modal from './Modal';
import { useDisclosure } from '@nextui-org/react';

export default function FileList() {
  const [listImage, setListImage] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: Add a loading state

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [urlToDownload, setUrlToDownload] = useState('');
  const [fileToDownload, setFileToDownload] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getListObjectsForUser(); // Wait for the promise to resolve
        setListImage(list); // Set the resolved data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Optional: Set loading to false after fetching is done
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: Render loading state
  }

  const handleDownload = async (fileName: string) => {
    console.log(fileName);
    const url = await createSafeUrlToDownloadFile(fileName);
    setUrlToDownload(url);
    setFileToDownload(fileName);

    onOpen();
  };

  return (
    <>
      <div>
        <h1>List of files</h1>
        {listImage?.length > 0 ? (
          listImage?.map((item, index) => (
            <div>
              <p>{item}</p>
              <button onClick={() => handleDownload(item)}>
                create link to download
              </button>
            </div>
          ))
        ) : (
          <div>No items found</div>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        urlToDownload={urlToDownload}
        fileName={fileToDownload}
      />
    </>
  );
}
