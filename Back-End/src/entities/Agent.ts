import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Customer} from "./Customer";

@Entity("agent", {schema: "new_database"})
export class Agent {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "username", nullable: true})
    username: string | null;

    @Column("text", {name: "password", nullable: true})
    password: string | null;

    @Column("text", {name: "token", nullable: true})
    token: string | null;

    @Column("text", {name: "phone", nullable: true})
    phone: string | null;

    @Column("text", {name: "email", nullable: true})
    email: string | null;

    @Column("double", {
        name: "commission",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    commission: number | null;

    @Column("tinyint", {
        name: "ban",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    ban: boolean | null;

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

    @OneToMany(() => Customer, (customer) => customer.agent)
    customers: Customer[];
}
