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

@Index("fk_type_payment_type_payment_1", ["merchantId"], {})
@Entity("mcpayment_type_payment", {schema: "mcpayment"})
export class McpaymentTypePayment {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "merchant_id", nullable: true})
    merchantId: number | null;

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

    @ManyToOne(() => Mcpayment, (mcpayment) => mcpayment.mcpaymentTypePayments, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "merchant_id", referencedColumnName: "id"}])
    merchant: Mcpayment;
}
