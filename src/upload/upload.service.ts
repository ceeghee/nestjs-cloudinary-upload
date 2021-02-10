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
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async updateProfilePicture(props: any) {
    const { createReadStream } = await props.file;
    const result = await this.uploadStream(createReadStream);
    return result.secure_url;
  }

  async uploadStream(upload_stream: any): Promise<any> {
    const stream_up = () => {
      return new Promise((resolve, reject) => {
        const stream = v2.uploader.upload_stream((error, result) => {
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
