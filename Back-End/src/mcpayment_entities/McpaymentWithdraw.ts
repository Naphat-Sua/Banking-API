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

@Index("fk_mcpayment_withdraw_mcpayment_withdraw_1", ["customerId"], {})
@Entity("mcpayment_withdraw", {schema: "mcpayment"})
export class McpaymentWithdraw {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("text", {name: "orderid", nullable: true})
    orderid: string | null;

    @Column("text", {name: "token", nullable: true})
    token: string | null;

    @Column("double", {
        name: "amount",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    amount: number | null;

    @Column("double", {
        name: "mdr",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdr: number | null;

    @Column("text", {name: "type_payment", nullable: true})
    typePayment: string | null;

    @Column("text", {name: "status", nullable: true})
    status: string | null;

    @Column("text", {name: "currency", nullable: true})
    currency: string | null;

    @Column("text", {name: "comment", nullable: true})
    comment: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(
        () => McpaymentCustomer,
        (mcpaymentCustomer) => mcpaymentCustomer.mcpaymentWithdraws,
        {onDelete: "RESTRICT", onUpdate: "RESTRICT"}
    )
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: McpaymentCustomer;
}
