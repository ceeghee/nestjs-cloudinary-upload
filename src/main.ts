import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
const corsOptionss = {
  origin: '*',
  preflightContinue: false,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptionss);
  const port: number = parseInt(process.env.PORT, 10) || 5000;
  console.log('App listening on port : ', port);

  await app.listen(port);
}
bootstrap();
