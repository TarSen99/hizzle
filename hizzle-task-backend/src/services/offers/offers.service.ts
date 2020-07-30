import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Offer } from '../../models/offer.entity';

@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Offer)
        private readonly offerRepo: MongoRepository<Offer>,
    ) {

    }

    async getOffers(): Promise<Offer[]> {
        return await this.offerRepo.find()
    }
}
