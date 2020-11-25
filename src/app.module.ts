import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { Upload } from './upload/upload.scalar';

@Module({
  imports: [
    UploadModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      uploads: {
        maxFileSize: 10000000, // 10 MB
        maxFiles: 5,
      },
      definitions: {
        path: join(process.cwd(), `${process.env.GRAPHQL_FILE}`),
      },
      installSubscriptionHandlers: true,
      playground: true,
      context: ({ req, connection }) => {
        // subscription
        if (connection) {
          return { req: connection.context, subscription: true };
        }
        // queries and mutations
        return { req };
      },
      introspection: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Upload],
})
export class AppModule {}
