'use server';
import { S3, PutObjectCommand } from '@aws-sdk/client-s3';

export async function handleFormSubmit(currentState, formData: FormData) {
  const file = formData.get('my-file');

  if (!(file instanceof File)) {
    return { status: 'error', message: 'No valid file provided' };
  }

  const fileName = file?.name;
  const fileType = file?.type;
  const fileSize = file?.size;

  const allowedFileTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png'];

  const maxFileSize = 1 * 1024 * 1024; // 1MB
  if (fileSize > maxFileSize) {
    return { status: 'error', message: 'File size exceeds the 1MB limit.' };
  }

  if (!allowedFileTypes.includes(fileType)) {
    return {
      status: 'error',
      message: 'Invalid file type. Only jpg, jpeg, and png are allowed.',
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
