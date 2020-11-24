import { UploadService } from './upload.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class UploadResolver {

	constructor(private readonly uploadService: UploadService) {

	}

	@Mutation()
	async updateProfilePicture(
		@Args('data', { type: () => GraphQLUpload }) stream: any,
	) {
		return this.uploadService.updateProfilePicture(stream);
	}
}
