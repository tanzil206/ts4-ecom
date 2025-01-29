import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Order {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  orderId!: string;

  @Column()
  userId!: string;

  @Column()
  productId!: string;

  @Column('int')
  quantity!: number;
}
