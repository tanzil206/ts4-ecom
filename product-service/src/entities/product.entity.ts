import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  productId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('decimal')
  price!: number;
}
