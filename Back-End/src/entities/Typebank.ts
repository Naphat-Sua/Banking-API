import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Accountbank} from "./Accountbank";
import {Settlement} from "./Settlement";

@Entity("typebank", {schema: "new_database"})
export class Typebank {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "name", nullable: true})
    name: string | null;

    @Column("text", {name: "name_en", nullable: true})
    nameEn: string | null;

    @Column("text", {name: "key", nullable: true})
    key: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Accountbank, (accountbank) => accountbank.banktype)
    accountbanks: Accountbank[];

    @OneToMany(() => Settlement, (settlement) => settlement.banktype)
    settlements: Settlement[];
}
