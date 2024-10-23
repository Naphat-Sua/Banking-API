import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {McpaymentCustomerDeal} from "./McpaymentCustomerDeal";
import {McpaymentOrder} from "./McpaymentOrder";
import {McpaymentTotal} from "./McpaymentTotal";
import {McpaymentWithdraw} from "./McpaymentWithdraw";

@Entity("mcpayment_customer", {schema: "mcpayment"})
export class McpaymentCustomer {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "main_id", nullable: true})
    mainId: number | null;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "key", nullable: true})
    key: string | null;

    @Column("text", {name: "secertkey", nullable: true})
    secertkey: string | null;

    @Column("tinyint", {
        name: "is_ban",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    isBan: boolean | null;

    @Column("tinyint", {
        name: "encrypto",
        nullable: true,
        width: 1,
        default: () => "'1'",
    })
    encrypto: boolean | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(
        () => McpaymentCustomerDeal,
        (mcpaymentCustomerDeal) => mcpaymentCustomerDeal.customer
    )
    mcpaymentCustomerDeals: McpaymentCustomerDeal[];

    @OneToMany(() => McpaymentOrder, (mcpaymentOrder) => mcpaymentOrder.customer)
    mcpaymentOrders: McpaymentOrder[];

    @OneToMany(() => McpaymentTotal, (mcpaymentTotal) => mcpaymentTotal.customer)
    mcpaymentTotals: McpaymentTotal[];

    @OneToMany(
        () => McpaymentWithdraw,
        (mcpaymentWithdraw) => mcpaymentWithdraw.customer
    )
    mcpaymentWithdraws: McpaymentWithdraw[];
}
