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

		console.log('uploading...');
		// let stream_up = () => {
		// 	return new Promise((resolve, reject) => {
		// 		let stream = v2.uploader.upload_stream(
		// 			(error, result) => {
		// 				if (result) {
		// 					resolve(result);
		// 				} else {
		// 					reject(error);
		// 				}
		// 			}
		// 		);

		// 		createReadStream().pipe(stream);
		// 	});
		// }

		const result = await this.uploadStream(createReadStream);
		console.log(result);

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

	async uploadStream(upload_stream: any): Promise<any> {
		let stream_up = () => {
			return new Promise((resolve, reject) => {
				let stream = v2.uploader.upload_stream(
					(error, result) => {
						if (result) {
							resolve(result);
						} else {
							reject(error);
						}
					}
				);
				upload_stream().pipe(stream);
			});
		}
		return stream_up();
	}
}
