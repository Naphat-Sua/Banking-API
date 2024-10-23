import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {Customer} from "./Customer";

@Index("fk_crypto_wallet_crypto_wallet_2", ["customerId"], {})
@Entity("crypto_wallet", {schema: "new_database"})
export class CryptoWallet {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "currency", nullable: true})
    currency: string | null;

    @Column("double", {
        name: "balance",
        nullable: true,
        precision: 22,
        default: () => "'0'",
    })
    balance: number | null;

    @Column("text", {name: "wallet_address", nullable: true})
    walletAddress: string | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.cryptoWallets, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;
}
