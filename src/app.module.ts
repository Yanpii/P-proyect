import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule, 
    MongooseModule.forRoot(`${process.env['MONGODB_URI']}/${process.env['MONGODB_DATABASE_NAME']}`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
