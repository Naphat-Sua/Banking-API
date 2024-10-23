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
import {Mcpayment} from "./Mcpayment";
import {McpaymentOrder} from "./McpaymentOrder";

@Index("fk_callback_callback_1", ["merchantId"], {})
@Index("fk_callback_callback_2", ["orderId"], {})
@Entity("mcpayment_callback", {schema: "mcpayment"})
export class McpaymentCallback {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "merchant_id", nullable: true})
    merchantId: number | null;

    @Column("int", {name: "order_id", nullable: true})
    orderId: number | null;

    @Column("text", {name: "transid", nullable: true})
    transid: string | null;

    @Column("text", {name: "rescode", nullable: true})
    rescode: string | null;

    @Column("text", {name: "resmsg", nullable: true})
    resmsg: string | null;

    @Column("text", {name: "stan", nullable: true})
    stan: string | null;

    @Column("text", {name: "receipt_number", nullable: true})
    receiptNumber: string | null;

    @Column("text", {name: "cardname", nullable: true})
    cardname: string | null;

    @Column("text", {name: "cardno", nullable: true})
    cardno: string | null;

    @Column("text", {name: "cardco", nullable: true})
    cardco: string | null;

    @Column("tinyint", {name: "secure_3d", nullable: true, width: 1})
    secure_3d: boolean | null;

    @Column("text", {name: "all_data", nullable: true})
    allData: string | null;

    @Column("text", {name: "all_data_query", nullable: true})
    allDataQuery: string | null;

    @Column("text", {name: "all_data_body", nullable: true})
    allDataBody: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Mcpayment, (mcpayment) => mcpayment.mcpaymentCallbacks, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "merchant_id", referencedColumnName: "id"}])
    merchant: Mcpayment;

    @ManyToOne(
        () => McpaymentOrder,
        (mcpaymentOrder) => mcpaymentOrder.mcpaymentCallbacks,
        {onDelete: "RESTRICT", onUpdate: "RESTRICT"}
    )
    @JoinColumn([{name: "order_id", referencedColumnName: "id"}])
    order: McpaymentOrder;
}
