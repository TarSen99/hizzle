import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OffersController } from './controllers/offers/offers.controller';
import { PropertiesController } from './controllers/properties/properties.controller';
import { PropertiesService } from './services/properties/properties.service';
import { OffersService } from './services/offers/offers.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './models/property.entity';
import { Offer } from './models/offer.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DATABASE,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    TypeOrmModule.forFeature([Property, Offer]),
  ],
  controllers: [AppController, OffersController, PropertiesController],
  providers: [AppService, PropertiesService, OffersService],
})
export class AppModule {}
