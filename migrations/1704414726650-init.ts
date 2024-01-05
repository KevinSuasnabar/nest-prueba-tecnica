import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1704414726650 implements MigrationInterface {
    name = 'Init1704414726650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "age" integer NOT NULL, "email" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "role" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "currency" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "name" text NOT NULL, "code" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "exchange_rate_value" decimal(10,5) NOT NULL, "key_code" text NOT NULL, "currency_origin_id" integer, "currency_destination_id" integer)`);
        await queryRunner.query(`CREATE TABLE "user_tracking_exchange_rates" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "origin_amount" decimal(10,3) NOT NULL, "destination_amount" decimal(10,3) NOT NULL, "origin_currency_code" text NOT NULL, "destination_currency_code" text NOT NULL, "exchange_rate_value" decimal(10,3) NOT NULL, "user_id" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_exchange_rate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "exchange_rate_value" decimal(10,5) NOT NULL, "key_code" text NOT NULL, "currency_origin_id" integer, "currency_destination_id" integer, CONSTRAINT "FK_363f4119520034cc0100e59e519" FOREIGN KEY ("currency_origin_id") REFERENCES "currency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_5532dc3def6337874dfc4cfeb17" FOREIGN KEY ("currency_destination_id") REFERENCES "currency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_exchange_rate"("id", "created_at", "updated_at", "exchange_rate_value", "key_code", "currency_origin_id", "currency_destination_id") SELECT "id", "created_at", "updated_at", "exchange_rate_value", "key_code", "currency_origin_id", "currency_destination_id" FROM "exchange_rate"`);
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
        await queryRunner.query(`ALTER TABLE "temporary_exchange_rate" RENAME TO "exchange_rate"`);

        await queryRunner.query(`INSERT INTO users (first_name,last_name,age,email,username,password,role,created_at,updated_at) VALUES ('Kevin','Suasnabar',27,'kevin@gmail.com','ksuasnabar','$2b$10$CRZNlwEATkJXHbNMPzWHKeXcPGgBklqAa9WHg11SpIKx4qeTulJSO','ADMIN',DATE('now'),DATE('now'))`);
        await queryRunner.query(`INSERT INTO users (first_name,last_name,age,email,username,password,role,created_at,updated_at) VALUES ('jose','Suazo',30,'jose@gmail.com','jsuazo','$2b$10$CRZNlwEATkJXHbNMPzWHKeXcPGgBklqAa9WHg11SpIKx4qeTulJSO','BASIC',DATE('now'),DATE('now'))`);

        await queryRunner.query(`INSERT INTO currency (name,code,created_at,updated_at) VALUES ('Dólar americano','USD',DATE('now'),DATE('now'))`);
        await queryRunner.query(`INSERT INTO currency (name,code,created_at,updated_at) VALUES ('Euro','EUR',DATE('now'),DATE('now'))`);
        await queryRunner.query(`INSERT INTO currency (name,code,created_at,updated_at) VALUES ('Libra esterlina','GBP',DATE('now'),DATE('now'))`);
        await queryRunner.query(`INSERT INTO currency (name,code,created_at,updated_at) VALUES ('Nuevo Sol','PEN',DATE('now'),DATE('now'))`);

        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (1,2,0.92,DATE('now'),DATE('now'),'USD-EUR')`);
        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (1,3,0.79,DATE('now'),DATE('now'),'USD-GBP')`);
        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (1,4,3.70,DATE('now'),DATE('now'),'USD-PEN')`);


        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (2,1,1.09,DATE('now'),DATE('now'),'EUR-USD')`);
        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (2,3,0.86,DATE('now'),DATE('now'),'EUR-GBP')`);
        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (2,4,4.05,DATE('now'),DATE('now'),'EUR-PEN')`);


        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (3,1,1.27,DATE('now'),DATE('now'),'GBP-USD')`);
        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (3,2,1.16,DATE('now'),DATE('now'),'GBP-EUR')`);
        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (3,4,4.69,DATE('now'),DATE('now'),'GBP-PEN')`);

        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (4,1,0.27,DATE('now'),DATE('now'),'PEN-USD')`);
        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (4,2,0.25,DATE('now'),DATE('now'),'PEN-EUR')`);
        await queryRunner.query(`INSERT INTO exchange_rate (currency_origin_id,currency_destination_id,exchange_rate_value,created_at,updated_at,key_code) VALUES (4,3,0.21,DATE('now'),DATE('now'),'PEN-GBP')`);



    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_rate" RENAME TO "temporary_exchange_rate"`);
        await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "exchange_rate_value" decimal(10,5) NOT NULL, "key_code" text NOT NULL, "currency_origin_id" integer, "currency_destination_id" integer)`);
        await queryRunner.query(`INSERT INTO "exchange_rate"("id", "created_at", "updated_at", "exchange_rate_value", "key_code", "currency_origin_id", "currency_destination_id") SELECT "id", "created_at", "updated_at", "exchange_rate_value", "key_code", "currency_origin_id", "currency_destination_id" FROM "temporary_exchange_rate"`);
        await queryRunner.query(`DROP TABLE "temporary_exchange_rate"`);
        await queryRunner.query(`DROP TABLE "user_tracking_exchange_rates"`);
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TABLE "users"`);

        await queryRunner.query(`DELETE FROM users`);

        await queryRunner.query(`DELETE FROM currency`);

        await queryRunner.query(`DELETE FROM exchange_rate`);


    }

}
