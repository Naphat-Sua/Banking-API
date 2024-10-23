import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: string;

  @Column({ default: null, nullable: true })
  amount: number;

  @Column({ default: null, nullable: true })
  currency: string;

  @Column({ default: null, nullable: true })
  description: string;

  @Column({ default: null, nullable: true })
  token: string;

  @Column({ default: null, nullable: true })
  customer_id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ default: null, nullable: true })
  status: string;

  @Column({ default: null, nullable: true })
  approve_amount: number;

  @Column({ default: null, nullable: true })
  type: string;

  @Column({ default: null, nullable: true })
  success_indicator: string;

  @Column({ default: null, nullable: true })
  session_id: string;

  @Column({ default: null, nullable: true })
  merchant_id: string;
}
