import { Module, DynamicModule } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
})
export class DatabaseModule {
  static forRoot(): DynamicModule {

    const {
      DB_HOST,
      DB_PORT,
      DB_USER,
      DB_PASS,
      DB_AUTH,
    } = process.env;

    const mongoUri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_AUTH}`;

    return {
      module: DatabaseModule,
      imports: [MongooseModule.forRoot(mongoUri)],
      exports: [MongooseModule],
    };
  }
}