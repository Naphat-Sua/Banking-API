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
import {Logsorder} from "./Logsorder";
import {Customer} from "./Customer";

@Index("fk_withdraw_withdraw_2", ["customerId"], {})
@Entity("withdraw", {schema: "new_database"})
export class Withdraw {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "old_id", nullable: true})
    oldId: string | null;

    @Column("text", {name: "token", nullable: true})
    token: string | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("text", {name: "orderid", nullable: true})
    orderid: string | null;

    @Column("text", {name: "account", nullable: true})
    account: string | null;

    @Column("text", {name: "to_banking", nullable: true})
    toBanking: string | null;

    @Column("double", {
        name: "price",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    price: number | null;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("tinyint", {
        name: "send_callback",
        nullable: true,
        width: 1,
        default: () => "'1'",
    })
    sendCallback: boolean | null;

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

    @Column("double", {
        name: "fee",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    fee: number | null;

    @Column("text", {name: "image", nullable: true})
    image: string | null;

    @Column("text", {name: "callback", nullable: true})
    callback: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Logsorder, (logsorder) => logsorder.withdraw)
    logsorders: Logsorder[];

    @ManyToOne(() => Customer, (customer) => customer.withdraws, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;
}
