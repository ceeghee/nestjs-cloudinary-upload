import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { v2 } from 'cloudinary';
@Injectable()
export class UploadService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dgkacpt2u',
      api_key: process.env.CLOUDINARY_API_KEY || '581928764961869',
      api_secret:
        process.env.CLOUDINARY_API_SECRET || '3cbRkTtuY9rZqJVH9kl9S3kZlrw',
    });
  }

  async updateProfilePicture(props: any) {
    const { createReadStream, filename } = await props.file;
    const result = await this.uploadStream(createReadStream);
    console.log(result);
    return result.secure_url;
  }

  async uploadStream(upload_stream: any): Promise<any> {
    let stream_up = () => {
      return new Promise((resolve, reject) => {
        let stream = v2.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        upload_stream().pipe(stream);
      });
    };
    return stream_up();
  }
}
