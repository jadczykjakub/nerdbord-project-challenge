import { S3 } from '@aws-sdk/client-s3';

export function createS3Client() {
  return new S3({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_IAM_USER_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_IAM_USER_SECRET_KEY!,
    },
  });
}
