import {MigrationInterface, QueryRunner} from "typeorm";

export class team1582376647699 implements MigrationInterface {
    name = 'team1582376647699'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `team` (`id` int NOT NULL AUTO_INCREMENT, `signId` int NULL, UNIQUE INDEX `REL_a2559819d5bcc1c6b98df091fd` (`signId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `role` enum ('user', 'admin', 'member') NOT NULL DEFAULT 'user'", undefined);
        await queryRunner.query("ALTER TABLE `team` ADD CONSTRAINT `FK_a2559819d5bcc1c6b98df091fde` FOREIGN KEY (`signId`) REFERENCES `sign`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `team` DROP FOREIGN KEY `FK_a2559819d5bcc1c6b98df091fde`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `role` enum ('user', 'admin', 'member') NOT NULL DEFAULT 'user'", undefined);
        await queryRunner.query("DROP INDEX `REL_a2559819d5bcc1c6b98df091fd` ON `team`", undefined);
        await queryRunner.query("DROP TABLE `team`", undefined);
    }

}
