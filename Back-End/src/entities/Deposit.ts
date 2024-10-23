import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {Customer} from "./Customer";
import {Accountbank} from "./Accountbank";
import {Logsorder} from "./Logsorder";

@Index("fk_deposit_deposit_2", ["accountbankId"], {})
@Index("fk_deposit_deposit_1", ["customerId"], {})
@Entity("deposit", {schema: "new_database"})
export class Deposit {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "old_id", nullable: true})
    oldId: string | null;

    @Column("text", {name: "token", nullable: true})
    token: string | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("int", {name: "accountbank_id", nullable: true})
    accountbankId: number | null;

    @Column("text", {name: "orderid", nullable: true})
    orderid: string | null;

    @Column("tinyint", {
        name: "qrcode",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    qrcode: boolean | null;

    @Column("double", {
        name: "price",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    price: number | null;

    @Column("double", {
        name: "real_price",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    realPrice: number | null;

    @Column("text", {name: "from_account", nullable: true})
    fromAccount: string | null;

    @Column("text", {name: "from_bank", nullable: true})
    fromBank: string | null;

    @Column("text", {name: "from_name", nullable: true})
    fromName: string | null;

    @Column("text", {name: "status", nullable: true})
    status: string | null;

    @Column("double", {
        name: "mdr",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdr: number | null;

    @Column("text", {name: "callback", nullable: true})
    callback: string | null;

    @Column("text", {name: "comment", nullable: true})
    comment: string | null;

    @Column("tinyint", {
        name: "send_callback",
        nullable: true,
        width: 1,
        default: () => "'1'",
    })
    sendCallback: boolean | null;

    @Column("text", {name: "return_page", nullable: true})
    returnPage: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.deposits, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;

    @ManyToOne(() => Accountbank, (accountbank) => accountbank.deposits, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "accountbank_id", referencedColumnName: "id"}])
    accountbank: Accountbank;

    @OneToMany(() => Logsorder, (logsorder) => logsorder.deposit)
    logsorders: Logsorder[];
}
