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

@Entity("autosms", {schema: "new_database"})
export class Autosms {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "Phone", nullable: true})
    phone: string | null;

    @Column("text", {name: "Status", nullable: true})
    status: string | null;

    @Column("text", {name: "FromPhone", nullable: true})
    fromPhone: string | null;

    @Column("datetime", {name: "Time", nullable: true})
    time: Date | null;

    @Column("text", {name: "Content", nullable: true})
    content: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Logsorder, (logsorder) => logsorder.autosms)
    logsorders: Logsorder[];
}
