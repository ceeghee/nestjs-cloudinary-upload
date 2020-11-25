import { IsNotEmpty } from 'class-validator';
import { Upload } from 'src/graphql.schema';

export class FileInputDTO {
  @IsNotEmpty()
  file: Upload;
}
