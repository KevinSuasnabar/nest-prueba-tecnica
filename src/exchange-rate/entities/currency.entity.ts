import { BaseEntity } from "../../config/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'currency' })
export class Currency extends BaseEntity {

    @Column({
        type: 'text', //se le pone tipo text debido a que en sqlite no existe el tipo string
        comment: 'Currency name',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'text',
        comment: 'Code of currency',
        nullable: false,
    })
    code: string;
}