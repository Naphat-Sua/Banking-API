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

@Index("fk_mcpayment_total_mcpayment_total_1", ["customerId"], {})
@Entity("mcpayment_total", {schema: "mcpayment"})
export class McpaymentTotal {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("text", {name: "currency", nullable: true})
    currency: string | null;

    @Column("double", {
        name: "amount_deposit",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    amountDeposit: number | null;

    @Column("double", {
        name: "amount_withdraw",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    amountWithdraw: number | null;

    @Column("double", {
        name: "balance",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    balance: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(
        () => McpaymentCustomer,
        (mcpaymentCustomer) => mcpaymentCustomer.mcpaymentTotals,
        {onDelete: "RESTRICT", onUpdate: "RESTRICT"}
    )
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: McpaymentCustomer;
}
