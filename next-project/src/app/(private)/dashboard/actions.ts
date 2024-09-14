'use server';
import { S3, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { createClientServer } from '@lib/db';

export async function handleFormSubmit(currentState, formData: FormData) {
  const file = formData.get('my-file');

  const supabase = createClientServer();
  const { data } = await supabase.auth.getUser();
  const email = data?.user?.email;

  if (!(file instanceof File)) {
    return { status: 'error', message: 'No valid file provided' };
  }

  const fileName = `${email}/${file?.name}`;
  const fileType = file?.type;
  const fileSize = file?.size;

  const allowedFileTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

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

  const s3client = new S3({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY!,
    },
  });

  const params = {
    Bucket: 'nerdboard-cloud',
    Key: fileName,
    Body: fileBuffer,
    ContentType: fileType,
  };

  try {
    await s3client.send(new PutObjectCommand(params));
    return {
      status: 'success',
      message: `File ${fileName} uploaded successfully`,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { status: 'error', message: err.message };
    } else {
      return { status: 'error', message: 'An unknown error occurred' };
    }
  }
}

export async function getListObjectsForUser() {
  const supabase = createClientServer();
  const { data } = await supabase.auth.getUser();
  const email = data?.user?.email;

  const s3client = new S3({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY!,
    },
  });

  const params = {
    Bucket: 'nerdboard-cloud',
    Prefix: email,
  };

  try {
    const data = await s3client.send(new ListObjectsV2Command(params));

    const objects = data.Contents.map(
      (object) => `https://d6v2h19htldqs.cloudfront.net/${object.Key}`
    );

    console.log(objects)


    return objects;
  } catch (error) {
    console.error('Error listing objects:', error);
  }
}
