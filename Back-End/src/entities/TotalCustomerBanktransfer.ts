import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {Customer} from "./Customer";

@Index(
    "fk_total_customer_banktransfer_total_customer_banktransfer_1",
    ["customerId"],
    {}
)
@Entity("total_customer_banktransfer", {schema: "new_database"})
export class TotalCustomerBanktransfer {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("double", {
        name: "deposit",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    deposit: number | null;

    @Column("double", {
        name: "withdraw",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    withdraw: number | null;

    @Column("double", {
        name: "settlement",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    settlement: number | null;

    @Column("double", {
        name: "mdr_deposit",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrDeposit: number | null;

    @Column("double", {
        name: "mdr_withdraw",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrWithdraw: number | null;

    @Column("double", {
        name: "mdr_settlement",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrSettlement: number | null;

    @Column("double", {
        name: "fee_settlement",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    feeSettlement: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToOne(
        () => Customer,
        (customer) => customer.totalCustomerBanktransfers,
        {onDelete: "RESTRICT", onUpdate: "RESTRICT"}
    )
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;
}
