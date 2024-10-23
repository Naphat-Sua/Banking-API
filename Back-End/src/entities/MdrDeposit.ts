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

@Index("fk_mdr_deposit_mdr_deposit_1", ["customerId"], {})
@Entity("mdr_deposit", {schema: "new_database"})
export class MdrDeposit {
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.mdrDeposits, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;
}
