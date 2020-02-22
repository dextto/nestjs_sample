import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSignTable1582357008516 implements MigrationInterface {
    name = 'AddSignTable1582357008516'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `sign` (`id` int NOT NULL AUTO_INCREMENT, `url` varchar(255) NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `sign` ADD CONSTRAINT `FK_5ccf140eb9269cbabdd1160b7e4` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `sign` DROP FOREIGN KEY `FK_5ccf140eb9269cbabdd1160b7e4`", undefined);
        await queryRunner.query("DROP TABLE `sign`", undefined);
    }

}
