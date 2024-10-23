import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  merchant_id: string;

  @Column({ default: null, nullable: true })
  merchant_name: string;

  @Column()
  api_key: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  auth_api: string;

  @Column()
  secret_key: string;

  @Column("text", {name: "token", nullable: true})
  token: string;

  @Column()
  merchant_url: string;

  @Column({ default: null, nullable: true })
  line_id: string;

  @Column({ default: null, nullable: true })
  telegram_id:string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
