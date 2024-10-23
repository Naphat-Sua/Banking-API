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

@Index("fk_mdr_fee_settlement_mdr_fee_settlement_1", ["customerId"], {})
@Entity("mdr_fee_settlement", {schema: "new_database"})
export class MdrFeeSettlement {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("double", {
        name: "min",
        nullable: true,
        precision: 22,
        default: () => "'0'",
    })
    min: number | null;

    @Column("double", {
        name: "max",
        nullable: true,
        precision: 22,
        default: () => "'0'",
    })
    max: number | null;

    @Column("double", {
        name: "mdr",
        nullable: true,
        precision: 22,
        default: () => "'0'",
    })
    mdr: number | null;

    @Column("double", {
        name: "fee",
        nullable: true,
        precision: 22,
        default: () => "'0'",
    })
    fee: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.mdrFeeSettlements, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;
}
