import { Controller, Get, Param } from '@nestjs/common';
import { PropertiesService } from './../../services/properties/properties.service';
import { Property } from '../../models/property.entity';

@Controller('properties')
export class PropertiesController {
    constructor(private readonly propertiesService: PropertiesService) {}

    @Get()
    async getProperties(): Promise<Property[]> {
      return this.propertiesService.getProperties()
    }

    @Get(':id')
    async getProperty(@Param('id') id): Promise<Property> {
      return this.propertiesService.getProperty(id)
    }
}
