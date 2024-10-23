import {Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Logs_request {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    timestamp: string

    @Column()
    req: Object

    @Column()
    res: Object

    @Column()
    error: Object

    @Column()
    responseTime: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
