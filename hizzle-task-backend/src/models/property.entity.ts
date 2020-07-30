import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('properties')
export class Property {
  @ObjectIdColumn() id: ObjectID;
  @Column() kind: string;
  @Column() location: string;
  @Column() bedrooms: number;
  @Column() area: number;


  constructor(property?: Partial<Property>) {
    Object.assign(this, property);
  }
}