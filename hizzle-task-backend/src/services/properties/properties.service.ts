import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Property } from '../../models/property.entity';

@Injectable()
export class PropertiesService {
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepo: MongoRepository<Property>,
    ) {

    }

    async getProperties():  Promise<Property[]> {
        return await this.propertyRepo.find()
    }

    async getProperty(id): Promise<Property> {
        return await this.propertyRepo.findOne(id)
    }
}
