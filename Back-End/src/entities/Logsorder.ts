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
import {Admin} from "./Admin";
import {Manager} from "./Manager";
import {Customer} from "./Customer";
import {Operation} from "./Operation";
import {Autosms} from "./Autosms";
import {Withdraw} from "./Withdraw";
import {Deposit} from "./Deposit";
import {Settlement} from "./Settlement";

@Index("fk_logsorder_logsorder_8", ["customerId"], {})
@Index("fk_logsorder_logsorder_7", ["settlementId"], {})
@Index("fk_logsorder_logsorder_6", ["managerId"], {})
@Index("fk_logsorder_logsorder_5", ["autosmsId"], {})
@Index("fk_logsorder_logsorder_4", ["withdrawId"], {})
@Index("fk_logsorder_logsorder_3", ["depositId"], {})
@Index("fk_logsorder_logsorder_2", ["operationId"], {})
@Index("fk_logsorder_logsorder_1", ["adminId"], {})
@Entity("logsorder", {schema: "new_database"})
export class Logsorder {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("int", {name: "admin_id", nullable: true})
    adminId: number | null;

    @Column("int", {name: "operation_id", nullable: true})
    operationId: number | null;

    @Column("int", {name: "deposit_id", nullable: true})
    depositId: number | null;

    @Column("int", {name: "manager_id", nullable: true})
    managerId: number | null;

    @Column("int", {name: "withdraw_id", nullable: true})
    withdrawId: number | null;

    @Column("int", {name: "customer_id", nullable: true})
    customerId: number | null;

    @Column("int", {name: "settlement_id", nullable: true})
    settlementId: number | null;

    @Column("int", {name: "autosms_id", nullable: true})
    autosmsId: number | null;

    @Column("tinyint", {
        name: "bot",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    bot: boolean | null;

    @Column("text", {name: "role", nullable: true})
    role: string | null;

    @Column("text", {name: "status", nullable: true})
    status: string | null;

    @Column("text", {name: "image", nullable: true})
    image: string | null;

    @Column("text", {name: "comment", nullable: true})
    comment: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Admin, (admin) => admin.logsorders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "admin_id", referencedColumnName: "id"}])
    admin: Admin;

    @ManyToOne(() => Manager, (manager) => manager.logsorders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "manager_id", referencedColumnName: "id"}])
    manager: Manager;

    @ManyToOne(() => Customer, (customer) => customer.logsorders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "customer_id", referencedColumnName: "id"}])
    customer: Customer;

    @ManyToOne(() => Operation, (operation) => operation.logsorders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "operation_id", referencedColumnName: "id"}])
    operation: Operation;

    @ManyToOne(() => Autosms, (autosms) => autosms.logsorders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "autosms_id", referencedColumnName: "id"}])
    autosms: Autosms;

    @ManyToOne(() => Withdraw, (withdraw) => withdraw.logsorders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "withdraw_id", referencedColumnName: "id"}])
    withdraw: Withdraw;

    @ManyToOne(() => Deposit, (deposit) => deposit.logsorders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "deposit_id", referencedColumnName: "id"}])
    deposit: Deposit;

    @ManyToOne(() => Settlement, (settlement) => settlement.logsorders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "settlement_id", referencedColumnName: "id"}])
    settlement: Settlement;
}
