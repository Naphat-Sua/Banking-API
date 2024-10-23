import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Logsorder} from "./Logsorder";

@Entity("operation", {schema: "new_database"})
export class Operation {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "username", nullable: true})
    username: string | null;

    @Column("text", {name: "password", nullable: true})
    password: string | null;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "phone", nullable: true})
    phone: string | null;

    @Column("text", {name: "email", nullable: true})
    email: string | null;

    @Column("text", {name: "token", nullable: true})
    token: string | null;

    @Column("tinyint", {
        name: "is_delete",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    isDelete: boolean | null;

    @Column("tinyint", {
        name: "ban",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    ban: boolean | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Logsorder, (logsorder) => logsorder.operation)
    logsorders: Logsorder[];
}
