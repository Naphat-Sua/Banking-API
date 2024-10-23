import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Allnotification} from "./Allnotification";
import {Notification} from "./Notification";

@Entity("type_notification", {schema: "new_database"})
export class TypeNotification {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "type", nullable: true})
    type: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Allnotification, (allnotification) => allnotification.type)
    allnotifications: Allnotification[];

    @OneToMany(() => Notification, (notification) => notification.type)
    notifications: Notification[];
}
