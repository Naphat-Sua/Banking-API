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
import {McpaymentCallback} from "./McpaymentCallback";
import {Mcpayment} from "./Mcpayment";
import {McpaymentCustomer} from "./McpaymentCustomer";

@Index("fk_order_order_1", ["merchantId"], {})
@Index("fk_order_order_2", ["customerId"], {})
@Entity("mcpayment_order", {schema: "mcpayment"})
export class McpaymentOrder {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "merchant_id", nullable: true})
    merchantId: number | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("text", {name: "orderid", nullable: true})
    orderid: string | null;

    @Column("text", {name: "token", nullable: true})
    token: string | null;

    @Column("text", {name: "currency", nullable: true})
    currency: string | null;

    @Column("double", {
        name: "amount",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    amount: number | null;

    @Column("text", {name: "shop_name", nullable: true})
    shopName: string | null;

    @Column("text", {name: "buyer", nullable: true})
    buyer: string | null;

    @Column("text", {name: "product", nullable: true})
    product: string | null;

    @Column("text", {name: "status", nullable: true})
    status: string | null;

    @Column("text", {name: "lang", nullable: true})
    lang: string | null;

    @Column("text", {name: "return_url", nullable: true})
    returnUrl: string | null;

    @Column("text", {name: "status_url", nullable: true})
    statusUrl: string | null;

    @Column("text", {name: "type_payment", nullable: true})
    typePayment: string | null;

    @Column("tinyint", {
        name: "use",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    use: boolean | null;

    @Column("double", {
        name: "mdr",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdr: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(
        () => McpaymentCallback,
        (mcpaymentCallback) => mcpaymentCallback.order
    )
    mcpaymentCallbacks: McpaymentCallback[];

    @ManyToOne(() => Mcpayment, (mcpayment) => mcpayment.mcpaymentOrders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "merchant_id", referencedColumnName: "id"}])
    merchant: Mcpayment;

    @ManyToOne(
        () => McpaymentCustomer,
        (mcpaymentCustomer) => mcpaymentCustomer.mcpaymentOrders,
        {onDelete: "RESTRICT", onUpdate: "RESTRICT"}
    )
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: McpaymentCustomer;
}
