import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '~src/app.module';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: console
    }),
    {
      logger: false,
    }
  );

  // Get Config Service
  const configService = app.get(ConfigService);

  // Use Global Pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(
    configService.get<number>('PORT', 80),
    configService.get<string>('HOST', '0.0.0.0'),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
