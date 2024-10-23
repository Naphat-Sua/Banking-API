import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {McpaymentCustomer} from "./McpaymentCustomer";
import {Mcpayment} from "./Mcpayment";

@Index("fk_customer_deal_customer_deal_2", ["customerId"], {})
@Index(
    "fk_mcpayment_customer_deal_mcpayment_customer_deal_1",
    ["merchantId"],
    {}
)
@Entity("mcpayment_customer_deal", {schema: "mcpayment"})
export class McpaymentCustomerDeal {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "merchant_id", nullable: true})
    merchantId: number | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("double", {
        name: "mdr",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdr: number | null;

    @Column("double", {
        name: "mdr_payout",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrPayout: number | null;

    @Column("text", {name: "type", nullable: true})
    type: string | null;

    @Column("text", {name: "currency", nullable: true})
    currency: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(
        () => McpaymentCustomer,
        (mcpaymentCustomer) => mcpaymentCustomer.mcpaymentCustomerDeals,
        {onDelete: "RESTRICT", onUpdate: "RESTRICT"}
    )
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: McpaymentCustomer;

    @ManyToOne(() => Mcpayment, (mcpayment) => mcpayment.mcpaymentCustomerDeals, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "merchant_id", referencedColumnName: "id"}])
    merchant: Mcpayment;
}
