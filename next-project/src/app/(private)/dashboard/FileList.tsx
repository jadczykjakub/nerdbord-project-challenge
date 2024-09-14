'use client';

import React, { useEffect, useState } from 'react';
import { getListObjectsForUser } from './actions';
import Image from 'next/image';
import { div } from 'framer-motion/client';

export default function FileList() {
  const [listImage, setListImage] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: Add a loading state

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

  return (
    <div>
      <h1>List of files</h1>
      {listImage.length > 0 ? (
        listImage.map((item, index) => (
          <div>{item}</div>
          // <Image key={index}  src={item} width={100} height={100} alt='cloud store image' /> // Render list items
        ))
      ) : (
        <div>No items found</div>
      )}
    </div>
  );
}
