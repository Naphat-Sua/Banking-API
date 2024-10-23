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

@Index("fk_member_customer_member_customer_1", ["customerId"], {})
@Entity("member_customer", {schema: "new_database"})
export class MemberCustomer {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "token", nullable: true})
    token: string | null;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "account", nullable: true})
    account: string | null;

    @Column("text", {name: "bank", nullable: true})
    bank: string | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("tinyint", {
        name: "is_delete",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    isDelete: boolean | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.memberCustomers, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;
}
