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
import {Accountbank} from "./Accountbank";
import {Customer} from "./Customer";

@Index("fk_muti_account_muti_account_1", ["accountId"], {})
@Index("fk_muti_account_muti_account_2", ["customerId"], {})
@Entity("muti_account", {schema: "new_database"})
export class MutiAccount {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "account_id", nullable: true})
    accountId: number | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Accountbank, (accountbank) => accountbank.mutiAccounts, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "account_id", referencedColumnName: "id"}])
    account: Accountbank;

    @ManyToOne(() => Customer, (customer) => customer.mutiAccounts, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;
}
