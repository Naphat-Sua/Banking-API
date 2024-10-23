import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export enum DirepayTransactionType {
  CHECKOUT = 'CHECKOUT',
  PAYMENT = 'PAYMENT',
  WITHDRAW = 'WITHDRAW',
}

@Entity()
export class DirepayTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  txid: string;

  @Column({nullable: true})
  direpay_id: string;

  @Column({nullable: true})
  tx_hash: string;

  @Column()
  customer_uid: string;

  @Column({type: 'double'})
  amount: number;

  @Column()
  currency: string;

  @Column({
    type: 'double',
    precision: 22,
    scale: 10
  })
  token_amount: number;

  @Column()
  token_code: string;

  @Column({
    type: 'double',
    precision: 22,
    scale: 10,
    default: 0,
  })
  fee: number;

  @Column({
    type: 'double',
    precision: 22,
    scale: 10,
    default: 0,
  })
  fee_usd: number;

  @Column()
  rates: string;

  @Column()
  payment_address: string;

  @Column()
  status: string;

  @Column({
    type: 'enum',
    enum: DirepayTransactionType,
  })
  type: DirepayTransactionType;

  @Column({type: 'json'})
  request: object;

  @Column({type: 'json'})
  response: object;

  @Column({type: 'json'})
  callback_response: object;

  @Column({type: 'datetime', nullable: true, default: null})
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
