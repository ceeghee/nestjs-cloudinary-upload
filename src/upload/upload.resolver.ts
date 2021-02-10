import { UploadService } from './upload.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation()
  async updateProfilePicture(
    @Args('data', { type: () => GraphQLUpload }) stream: any,
  ) {
    return this.uploadService.updateProfilePicture(stream);
  }
}
