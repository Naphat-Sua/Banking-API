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
import {TypeNotification} from "./TypeNotification";
import {Customer} from "./Customer";

@Index("fk_notification_notification_2", ["typeId"], {})
@Index("fk_notification_notification_1", ["customerId"], {})
@Entity("notification", {schema: "new_database"})
export class Notification {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "key", nullable: true})
    key: string | null;

    @Column("text", {name: "secretkey", nullable: true})
    secretkey: string | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("int", {name: "type_id", nullable: true})
    typeId: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(
        () => TypeNotification,
        (typeNotification) => typeNotification.notifications,
        {onDelete: "RESTRICT", onUpdate: "RESTRICT"}
    )
    @JoinColumn([{name: "type_id", referencedColumnName: "id"}])
    type: TypeNotification;

    @ManyToOne(() => Customer, (customer) => customer.notifications, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;
}
