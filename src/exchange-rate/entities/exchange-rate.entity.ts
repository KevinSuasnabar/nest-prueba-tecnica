import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Currency } from "./currency.entity";
import { BaseEntity } from "../../config/base.entity";

@Entity({ name: 'exchange_rate' })
export class ExchangeRate extends BaseEntity {

    @ManyToOne(() => Currency, { eager: false })
    @JoinColumn({ name: 'currency_origin_id' })
    currencyOriginId: number;

    @ManyToOne(() => Currency, { eager: false })
    @JoinColumn({ name: 'currency_destination_id' })
    currencyDestinationId: number;

    @Column({
        type: 'decimal',
        name: 'exchange_rate_value',
        precision: 10,
        scale: 5,
        comment: 'Exchange rate calculated',
        nullable: false,
    })
    exchangeRateValue: number;

    @Column({
        type: 'text',
        name: 'key_code',
        comment: 'Key code of combination currency',
        nullable: false,
    })
    keyCode:string;
}