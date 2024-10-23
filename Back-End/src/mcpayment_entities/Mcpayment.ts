import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {McpaymentCallback} from "./McpaymentCallback";
import {McpaymentCustomerDeal} from "./McpaymentCustomerDeal";
import {McpaymentOrder} from "./McpaymentOrder";
import {McpaymentTypePayment} from "./McpaymentTypePayment";

@Entity("mcpayment", {schema: "mcpayment"})
export class Mcpayment {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "mid", nullable: true})
    mid: string | null;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "key", nullable: true})
    key: string | null;

    @Column("text", {name: "secertkey", nullable: true})
    secertkey: string | null;

    @Column("text", {name: "type_env", nullable: true})
    typeEnv: string | null;

    @Column("tinyint", {
        name: "is_ban",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    isBan: boolean | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(
        () => McpaymentCallback,
        (mcpaymentCallback) => mcpaymentCallback.merchant
    )
    mcpaymentCallbacks: McpaymentCallback[];

    @OneToMany(
        () => McpaymentCustomerDeal,
        (mcpaymentCustomerDeal) => mcpaymentCustomerDeal.merchant
    )
    mcpaymentCustomerDeals: McpaymentCustomerDeal[];

    @OneToMany(() => McpaymentOrder, (mcpaymentOrder) => mcpaymentOrder.merchant)
    mcpaymentOrders: McpaymentOrder[];

    @OneToMany(
        () => McpaymentTypePayment,
        (mcpaymentTypePayment) => mcpaymentTypePayment.merchant
    )
    mcpaymentTypePayments: McpaymentTypePayment[];
}
