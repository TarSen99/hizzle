import { Entity, ObjectID, ObjectIdColumn, Column,  } from 'typeorm';
import { Property } from './property.entity'

@Entity('offers')
export class Offer {
  @ObjectIdColumn() id: ObjectID;
  @Column() offered_by: string;
  @Column() price: number;
  @Column(type => Property) property: Property;

  constructor(offer?: Partial<Offer>) {
    Object.assign(this, offer);
  }
}