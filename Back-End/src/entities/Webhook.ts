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

@Index("fk_webhook_webhook_1", ["customerId"], {})
@Entity("webhook", {schema: "new_database"})
export class Webhook {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "url", nullable: true})
    url: string | null;

    @Column("int", {name: "customerId", nullable: true})
    customerId: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.webhooks, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customerId", referencedColumnName: "id"}])
    customer: Customer;
}
