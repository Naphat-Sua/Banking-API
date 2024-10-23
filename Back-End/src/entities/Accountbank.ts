import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {Typebank} from "./Typebank";
import {Customer} from "./Customer";
import {Deposit} from "./Deposit";
import {MutiAccount} from "./MutiAccount";

@Index("fk_accountbank_accountbank_2", ["customerId"], {})
@Index("fk_accountbank_accountbank_1", ["banktypeId"], {})
@Entity("accountbank", {schema: "new_database"})
export class Accountbank {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "old_id", nullable: true})
    oldId: string | null;

    @Column("text", {name: "token_command", nullable: true})
    tokenCommand: string | null;

    @Column("text", {name: "username", nullable: true})
    username: string | null;

    @Column("text", {name: "password", nullable: true})
    password: string | null;

    @Column("text", {name: "account", nullable: true})
    account: string | null;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "promptpay", nullable: true})
    promptpay: string | null;

    @Column("tinyint", {
        name: "use",
        nullable: true,
        width: 1,
        default: () => "'1'",
    })
    use: boolean | null;

    @Column("double", {
        name: "balance",
        nullable: true,
        precision: 22,
        default: () => "'0'",
    })
    balance: number | null;

    @Column("int", {name: "banktype_id", nullable: true})
    banktypeId: number | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("tinyint", {
        name: "is_delete",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    isDelete: boolean | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Typebank, (typebank) => typebank.accountbanks, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "banktype_id", referencedColumnName: "id"}])
    banktype: Typebank;

    @ManyToOne(() => Customer, (customer) => customer.accountbanks, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;

    @OneToMany(() => Deposit, (deposit) => deposit.accountbank)
    deposits: Deposit[];

    @OneToMany(() => MutiAccount, (mutiAccount) => mutiAccount.account)
    mutiAccounts: MutiAccount[];
}
