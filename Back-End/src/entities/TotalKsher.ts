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

@Index("fk_total_ksher_total_ksher_1", ["customerId"], {})
@Entity("total_ksher", {schema: "new_database"})
export class TotalKsher {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("double", {
        name: "thaiqr",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    thaiqr: number | null;

    @Column("double", {
        name: "wechat",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    wechat: number | null;

    @Column("double", {
        name: "alipay",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    alipay: number | null;

    @Column("double", {
        name: "truemoney",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    truemoney: number | null;

    @Column("double", {
        name: "linepay",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    linepay: number | null;

    @Column("double", {
        name: "airpay",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    airpay: number | null;

    @Column("double", {
        name: "settlement_thaiqr",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    settlementThaiqr: number | null;

    @Column("double", {
        name: "settlement_wechat",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    settlementWechat: number | null;

    @Column("double", {
        name: "settlement_alipay",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    settlementAlipay: number | null;

    @Column("double", {
        name: "settlement_truemoney",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    settlementTruemoney: number | null;

    @Column("double", {
        name: "settlement_linepay",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    settlementLinepay: number | null;

    @Column("double", {
        name: "settlement_airpay",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    settlementAirpay: number | null;

    @Column("double", {
        name: "mdr_thaiqr",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrThaiqr: number | null;

    @Column("double", {
        name: "mdr_wechat",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrWechat: number | null;

    @Column("double", {
        name: "mdr_alipay",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrAlipay: number | null;

    @Column("double", {
        name: "mdr_truemoney",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrTruemoney: number | null;

    @Column("double", {
        name: "mdr_linepay",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrLinepay: number | null;

    @Column("double", {
        name: "mdr_airpay",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrAirpay: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.totalKshers, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;
}
