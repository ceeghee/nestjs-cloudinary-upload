import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
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
		const upload = await this.uploadStream(
			await createReadStream(),
		);
	}

	async uploadStream(stream: any): Promise<any> {
		try {
			const streamLoad = v2.uploader.upload_stream(
				{ tags: 'haggleX_user_img' },
				(err, img) => {
					if (err) {
						console.log(err);
						throw new BadRequestException('Unable to upload image, try again');
					}
					if (img) {
						console.log('uploaded image : ', img.secure_url)
					}
				},
			);
			await stream.pipe(streamLoad);
		} catch (error) {
			console.log(error);

			throw new BadGatewayException('error occured, please try again');
		}
	}
}
