import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {Accountbank} from "./Accountbank";
import {CryptoWallet} from "./CryptoWallet";
import {Agent} from "./Agent";
import {Deposit} from "./Deposit";
import {Logsorder} from "./Logsorder";
import {MdrDeposit} from "./MdrDeposit";
import {MdrFeeSettlement} from "./MdrFeeSettlement";
import {MdrWithdraw} from "./MdrWithdraw";
import {MemberCustomer} from "./MemberCustomer";
import {MutiAccount} from "./MutiAccount";
import {Notification} from "./Notification";
import {Settlement} from "./Settlement";
import {TotalCustomerBanktransfer} from "./TotalCustomerBanktransfer";
import {TotalKsher} from "./TotalKsher";
import {Webhook} from "./Webhook";
import {Withdraw} from "./Withdraw";

@Index("fk_customer_customer_1", ["agentId"], {})
@Entity("customer", {schema: "new_database"})
export class Customer {
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    id: number;

    @Column("text", {name: "old_id", nullable: true})
    oldId: string | null;

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

    @Column("text", {name: "auth_api", nullable: true})
    authApi: string | null;

    @Column("text", {name: "secertkey", nullable: true})
    secertkey: string | null;

    @Column("double", {
        name: "mdr_deposit",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrDeposit: number | null;

    @Column("double", {
        name: "mdr_qrcode",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrQrcode: number | null;

    @Column("double", {
        name: "mdr_withdraw",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrWithdraw: number | null;

    @Column("double", {
        name: "mdr_settlement",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    mdrSettlement: number | null;

    @Column("double", {
        name: "fee_settlement",
        nullable: true,
        precision: 22,
        scale: 2,
        default: () => "'0.00'",
    })
    feeSettlement: number | null;

    @Column("text", {name: "website", nullable: true})
    website: string | null;

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

    @Column("tinyint", {
        name: "encrypto",
        nullable: true,
        width: 1,
        default: () => "'1'",
    })
    encrypto: boolean | null;

    @Column("tinyint", {
        name: "enable_qrcode",
        nullable: true,
        width: 1,
        default: () => "'1'",
    })
    enableQrcode: boolean | null;

    @Column("int", {name: "agent_id", nullable: true})
    agentId: number | null;

    @Column("tinyint", {
        name: "wishlist_ip",
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    wishlistIp: boolean | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Accountbank, (accountbank) => accountbank.customer)
    accountbanks: Accountbank[];

    @OneToMany(() => CryptoWallet, (cryptoWallet) => cryptoWallet.customer)
    cryptoWallets: CryptoWallet[];

    @ManyToOne(() => Agent, (agent) => agent.customers, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{name: "agent_id", referencedColumnName: "id"}])
    agent: Agent;

    @OneToMany(() => Deposit, (deposit) => deposit.customer)
    deposits: Deposit[];

    @OneToMany(() => Logsorder, (logsorder) => logsorder.customer)
    logsorders: Logsorder[];

    @OneToMany(() => MdrDeposit, (mdrDeposit) => mdrDeposit.customer)
    mdrDeposits: MdrDeposit[];

    @OneToMany(
        () => MdrFeeSettlement,
        (mdrFeeSettlement) => mdrFeeSettlement.customer
    )
    mdrFeeSettlements: MdrFeeSettlement[];

    @OneToMany(() => MdrWithdraw, (mdrWithdraw) => mdrWithdraw.customer)
    mdrWithdraws: MdrWithdraw[];

    @OneToMany(() => MemberCustomer, (memberCustomer) => memberCustomer.customer)
    memberCustomers: MemberCustomer[];

    @OneToMany(() => MutiAccount, (mutiAccount) => mutiAccount.customer)
    mutiAccounts: MutiAccount[];

    @OneToMany(() => Notification, (notification) => notification.customer)
    notifications: Notification[];

    @OneToMany(() => Settlement, (settlement) => settlement.customer)
    settlements: Settlement[];

    @OneToOne(
        () => TotalCustomerBanktransfer,
        (totalCustomerBanktransfer) => totalCustomerBanktransfer.customer
    )
    totalCustomerBanktransfers: TotalCustomerBanktransfer;

    @OneToMany(() => TotalKsher, (totalKsher) => totalKsher.customer)
    totalKshers: TotalKsher[];

    @OneToMany(() => Webhook, (webhook) => webhook.customer)
    webhooks: Webhook[];

    @OneToMany(() => Withdraw, (withdraw) => withdraw.customer)
    withdraws: Withdraw[];
}
