'use server';
import {
  S3,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { createClientServer } from '@lib/db';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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

    const objects = data.Contents.map((object) => object.Key?.split('/').pop());

    console.log(objects);

    return objects;
  } catch (error) {
    console.error('Error listing objects:', error);
  }
}

export async function createSafeUrlToDownloadFile(name: string) {
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

  const fileName = `${email}/${name}`;

  const command = new GetObjectCommand({
    Bucket: 'nerdboard-cloud',
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

  const fileName = `${email}/${name}`;
  try {
    const command = new DeleteObjectCommand({
      Bucket: 'nerdboard-cloud',
      Key: fileName,
    });

    await s3client.send(command);

    return { status: 'ok', message: 'file was deleted' };
  } catch (err) {
    return { status: 'error', message: 'Something went wrong' };
  }
}
