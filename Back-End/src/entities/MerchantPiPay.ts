import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MerchantPiPay {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  merchant_id: string;

  @Column({ default: null, nullable: true })
  store_id: string;

  @Column()
  device_id: string;

  @Column()
  merchant_url: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  authA_ai: string;

  @Column()
  secret_key: string;

  @Column("text", {name: "token", nullable: true})
  token: string;

  @Column({ default: null, nullable: true })
  line_id: string;

  @Column({ default: null, nullable: true })
  telegram_id:string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
