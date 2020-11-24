import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
@Injectable()
export class UploadService {
	private timestamp = Math.round((new Date).getTime() / 1000);
	// const  signature = cloudinary.utils.api_sign_request({
	//   timestamp: timestamp,
	//   eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop',
	//   public_id: 'sample_image'}, process.env.API_SECRET);
	constructor() {
		const signature = v2.utils.api_sign_request({
			timestamp: this.timestamp,
			eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop',
			public_id: 'sample_image'
		}, process.env.CLOUDINARY_API_SECRET)
		console.log('signature', signature);

		v2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});
	}
	async updateProfilePicture(props: any) {
		console.log(await props.file);

		const { createReadStream, filename } = await props.file;
		console.log('filename:', filename);

		console.log(createReadStream);

		// const upload = await this.uploadStream( 
		// 	{ createReadStream }
		// );

		console.log('uploading...');
		const streamLoad = v2.uploader.upload_stream(
			{ tags: 'haggleX_user_img' },
			async (error, result) => {
				console.log(error, result);
				if (result) {
					console.log('done uploading...');
				}
			}
		);
		// const reader = createReadStream(filename, { encoding: 'binary' })
		// reader.on('open', function () {
		// 	console.log('stream open');
		// 	reader.pipe(streamLoad)
		// })

		// reader.on('data', function () {
		// 	console.log('stream has data');
		// })
		// reader.on('error', function () {
		// 	console.log('stream error');
		// })

		// reader.on('end', function () {
		// 	console.log('stream ended!');
		// 	streamLoad.end;
		// })
		// try {
		// 	const readStream = createReadStream().pipe(streamLoad);
		// 	readStream.on('error', function (err: any) {
		// 		console.log(err);
		// 	})
		// } catch (error) {
		// 	console.log('stream error', error);
		// }
		return 'holla';
	}

	async uploadStream(stream: any): Promise<any> {
		try {
			const streamLoad = v2.uploader.upload_stream(
				{ tags: 'haggleX_user_img' },
				function (error, result) {
					console.log(error, result);

				}
				// (err, img) => {
				// 	if (err) {
				// 		console.log(err);
				// 		throw new BadRequestException('Unable to upload image, try again');
				// 	}
				// 	if (img) {
				// 		console.log('uploaded image : ', img.secure_url)
				// 	}
				// },
			);
			stream().pipe(streamLoad);
		} catch (error) {
			console.log(error);

			throw new BadGatewayException('error occured, please try again');
		}
	}
}
