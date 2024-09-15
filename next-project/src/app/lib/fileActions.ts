'use server';

import {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { createClientServer } from '@lib/db';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getUserEmail } from '@lib/getUserEmail';
import { createS3Client } from '@lib/createS3Client';

export async function handleFormSubmit(currentState, formData: FormData) {
  const file = formData.get('my-file');

  const email = await getUserEmail();

  if (!(file instanceof File)) {
    return { status: 'error', message: 'No valid file provided' };
  }

  const fileName = `${email}/${file?.name}`;
  const fileType = file?.type;
  const fileSize = file?.size;

  const allowedFileTypes: string[] = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf',
  ];

  const maxFileSize = 1 * 1024 * 1024; // 1MB
  if (fileSize > maxFileSize) {
    return { status: 'error', message: 'File size exceeds the 1MB limit.' };
  }

  if (!allowedFileTypes.includes(fileType)) {
    return {
      status: 'error',
      message: 'Invalid file type. Only jpg, jpeg, png or pdf are allowed.',
    };
  }

  const binaryFile = await file.arrayBuffer();
  const fileBuffer = Buffer.from(binaryFile);
  const s3client = createS3Client();

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    Body: fileBuffer,
    ContentType: fileType,
  };

  try {
    await s3client.send(new PutObjectCommand(params));


    return {
      status: 'success',
      message: `File ${file?.name} uploaded successfully`,
    };
  } catch (err: unknown) {
    return { status: 'error', message: "Can't upload file" };
  }
}

export async function getAllFilesForUser() {
  const email = await getUserEmail();

  const s3client = createS3Client();

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Prefix: email,
  };

  try {
    const data = await s3client.send(new ListObjectsV2Command(params));

    const objects = data?.Contents?.map((object) =>
      object.Key?.split('/').pop()
    );
    return objects;
  } catch (error) {
    return { status: 'error', message: "Can't get files" };
  }
}

export async function createSafeUrlToDownloadFile(name: string) {
  const email = await getUserEmail();

  const s3client = createS3Client();

  const fileName = `${email}/${name}`;

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
  });

  try {
    const url = await getSignedUrl(s3client, command, { expiresIn: 60 });
    return url;
  } catch (err) {
    console.log(`error: ${err}`);
  }
}

export async function deleteFile(name: string) {
  const email = await getUserEmail();

  const s3client = createS3Client();

  const fileName = `${email}/${name}`;

  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
    });

    await s3client.send(command);

    return { status: 'success', message: 'file was deleted' };
  } catch (err) {
    return { status: 'error', message: "You can't remove file" };
  }
}
