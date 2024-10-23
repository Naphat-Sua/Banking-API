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
import {Typebank} from "./Typebank";

@Index("fk_settlement_settlement_2", ["banktypeId"], {})
@Index("fk_settlement_settlement_1", ["customerId"], {})
@Entity("settlement", {schema: "new_database"})
export class Settlement {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "banktype_id", nullable: true})
    banktypeId: number | null;

    @Column("text", {name: "bankaccount", nullable: true})
    bankaccount: string | null;

    @Column("text", {name: "bankname", nullable: true})
    bankname: string | null;

    @Column("double", {
        name: "price",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    price: number | null;

    @Column("text", {name: "image", nullable: true})
    image: string | null;

    @Column("double", {
        name: "mdr",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdr: number | null;

    @Column("tinyint", {
        name: "no_mdr",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    noMdr: boolean | null;

    @Column("double", {
        name: "fee",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    fee: number | null;

    @Column("tinyint", {
        name: "no_fee",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    noFee: boolean | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("text", {name: "status", nullable: true})
    status: string | null;

    @Column("text", {name: "orderid", nullable: true})
    orderid: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Logsorder, (logsorder) => logsorder.settlement)
    logsorders: Logsorder[];

    @ManyToOne(() => Customer, (customer) => customer.settlements, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;

    @ManyToOne(() => Typebank, (typebank) => typebank.settlements, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{name: "banktype_id", referencedColumnName: "id"}])
    banktype: Typebank;
}
