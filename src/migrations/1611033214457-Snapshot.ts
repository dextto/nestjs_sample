import {MigrationInterface, QueryRunner} from "typeorm";

export class Snapshot1611033214457 implements MigrationInterface {
    name = 'Snapshot1611033214457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `User` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(64) NOT NULL, `emailAddress` varchar(128) NOT NULL, `password` varchar(128) NOT NULL, `passwordSalt` varchar(32) NOT NULL, `emailAuthToken` varchar(128) NULL, `emailAuthTokenExpiryTime` datetime NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_c7a8d184ab23d7ebdc29453832` (`emailAddress`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_c7a8d184ab23d7ebdc29453832` ON `User`");
        await queryRunner.query("DROP TABLE `User`");
    }

}
