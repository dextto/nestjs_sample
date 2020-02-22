import {MigrationInterface, QueryRunner} from "typeorm";

export class init1582387605654 implements MigrationInterface {
    name = 'init1582387605654'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `role` enum ('user', 'admin', 'member') NOT NULL DEFAULT 'user', PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `sign` (`id` int NOT NULL AUTO_INCREMENT, `url` varchar(255) NOT NULL, `userId` int NULL, UNIQUE INDEX `IDX_b52969fde4e270bdb8a76a97c4` (`url`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `team` (`id` int NOT NULL AUTO_INCREMENT, `signId` int NULL, UNIQUE INDEX `REL_a2559819d5bcc1c6b98df091fd` (`signId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `team_member` (`id` int NOT NULL AUTO_INCREMENT, `can_read_teamsign` tinyint NOT NULL DEFAULT 0, `can_update_teamsign` tinyint NOT NULL DEFAULT 0, `can_delete_teamsign` tinyint NOT NULL DEFAULT 0, `userId` int NULL, `teamId` int NULL, UNIQUE INDEX `REL_d2be3e8fc9ab0f69673721c7fc` (`userId`), UNIQUE INDEX `REL_74da8f612921485e1005dc8e22` (`teamId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `role` enum ('user', 'admin', 'member') NOT NULL DEFAULT 'user'", undefined);
        await queryRunner.query("ALTER TABLE `sign` ADD CONSTRAINT `FK_5ccf140eb9269cbabdd1160b7e4` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `team` ADD CONSTRAINT `FK_a2559819d5bcc1c6b98df091fde` FOREIGN KEY (`signId`) REFERENCES `sign`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `team_member` ADD CONSTRAINT `FK_d2be3e8fc9ab0f69673721c7fc3` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `team_member` ADD CONSTRAINT `FK_74da8f612921485e1005dc8e225` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `team_member` DROP FOREIGN KEY `FK_74da8f612921485e1005dc8e225`", undefined);
        await queryRunner.query("ALTER TABLE `team_member` DROP FOREIGN KEY `FK_d2be3e8fc9ab0f69673721c7fc3`", undefined);
        await queryRunner.query("ALTER TABLE `team` DROP FOREIGN KEY `FK_a2559819d5bcc1c6b98df091fde`", undefined);
        await queryRunner.query("ALTER TABLE `sign` DROP FOREIGN KEY `FK_5ccf140eb9269cbabdd1160b7e4`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `role` enum ('user', 'admin', 'member') NOT NULL DEFAULT 'user'", undefined);
        await queryRunner.query("DROP INDEX `REL_74da8f612921485e1005dc8e22` ON `team_member`", undefined);
        await queryRunner.query("DROP INDEX `REL_d2be3e8fc9ab0f69673721c7fc` ON `team_member`", undefined);
        await queryRunner.query("DROP TABLE `team_member`", undefined);
        await queryRunner.query("DROP INDEX `REL_a2559819d5bcc1c6b98df091fd` ON `team`", undefined);
        await queryRunner.query("DROP TABLE `team`", undefined);
        await queryRunner.query("DROP INDEX `IDX_b52969fde4e270bdb8a76a97c4` ON `sign`", undefined);
        await queryRunner.query("DROP TABLE `sign`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
