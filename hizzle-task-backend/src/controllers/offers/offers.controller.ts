import { Controller, Get } from '@nestjs/common';
import { OffersService } from './../../services/offers/offers.service';
import { Offer } from '../../models/offer.entity';

@Controller('offers')
export class OffersController {
    constructor(private readonly offersService: OffersService) {}

    @Get()
    getOffers(): Promise<Offer[]> {
      return this.offersService.getOffers()
    }
}
