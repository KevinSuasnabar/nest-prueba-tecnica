import { BaseEntity } from "../../config/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'user_tracking_exchange_rates' })
export class UserTrackingExchangeRates extends BaseEntity {

    @Column({
        type: 'decimal',
        name: 'origin_amount',
        precision: 10,
        scale: 3,
        nullable: false,
    })
    originAmount: number;

    @Column({
        type: 'decimal',
        name: 'destination_amount',
        precision: 10,
        scale: 3,
        nullable: false,
    })
    destinationAmount: number;

    @Column({
        type: 'text',
        name: 'origin_currency_code',
    })
    originCurrencyCode: string;


    @Column({
        type: 'text',
        name: 'destination_currency_code',
    })
    destinationCurrencyCode: string;

    @Column({
        type: 'decimal',
        name: 'exchange_rate_value',
        precision: 10,
        scale: 3,
        nullable: false,
    })
    exchangeRateValue: number;


    @Column({
        type: 'int',
        name: 'user_id',
        nullable: false,
    })
    userId: number;

}