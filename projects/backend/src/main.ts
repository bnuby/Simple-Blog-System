import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '~src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { UserService } from '~components/user/user.service';

declare const module: any;

const isProduction = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    {
      logger: true,
    },
  );

  // Get Config Service
  const configService = app.get(ConfigService);
  const userService = app.get(UserService);

  // Use Global Pipe
  app.useGlobalPipes(new ValidationPipe());

  // Create admin Account
  await userService.create({
    first_name: configService.get<string>('ADMIN_USER'),
    password: configService.get<string>('ADMIN_PASS'),
    email: configService.get<string>('ADMIN_EMAIL'),
    last_name: '(system)',
    age: 99,
  });

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
