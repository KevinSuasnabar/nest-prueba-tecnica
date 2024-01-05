import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn({
        type: 'datetime',
        name: 'created_at'
    })
    createdAt: Date;


    @UpdateDateColumn({
        type: 'datetime',
        name: 'updated_at'
    })
    updatedAt: Date;
}