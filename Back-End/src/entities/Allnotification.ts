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

@Index("fk_allnotification_allnotification_1", ["typeId"], {})
@Entity("allnotification", {schema: "new_database"})
export class Allnotification {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "key", nullable: true})
    key: string | null;

    @Column("text", {name: "secertkey", nullable: true})
    secertkey: string | null;

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
        (typeNotification) => typeNotification.allnotifications,
        {onDelete: "RESTRICT", onUpdate: "RESTRICT"}
    )
    @JoinColumn([{name: "type_id", referencedColumnName: "id"}])
    type: TypeNotification;
}
