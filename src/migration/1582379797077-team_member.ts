import {MigrationInterface, QueryRunner} from "typeorm";

export class teamMember1582379797077 implements MigrationInterface {
    name = 'teamMember1582379797077'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `team_member` (`id` int NOT NULL AUTO_INCREMENT, `can_read_teamsign` tinyint NOT NULL DEFAULT 0, `can_update_teamsign` tinyint NOT NULL DEFAULT 0, `can_delete_teamsign` tinyint NOT NULL DEFAULT 0, `userId` int NULL, `teamId` int NULL, UNIQUE INDEX `REL_d2be3e8fc9ab0f69673721c7fc` (`userId`), UNIQUE INDEX `REL_74da8f612921485e1005dc8e22` (`teamId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `role` enum ('user', 'admin', 'member') NOT NULL DEFAULT 'user'", undefined);
        await queryRunner.query("ALTER TABLE `team_member` ADD CONSTRAINT `FK_d2be3e8fc9ab0f69673721c7fc3` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `team_member` ADD CONSTRAINT `FK_74da8f612921485e1005dc8e225` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `team_member` DROP FOREIGN KEY `FK_74da8f612921485e1005dc8e225`", undefined);
        await queryRunner.query("ALTER TABLE `team_member` DROP FOREIGN KEY `FK_d2be3e8fc9ab0f69673721c7fc3`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `role` enum ('user', 'admin', 'member') NOT NULL DEFAULT 'user'", undefined);
        await queryRunner.query("DROP INDEX `REL_74da8f612921485e1005dc8e22` ON `team_member`", undefined);
        await queryRunner.query("DROP INDEX `REL_d2be3e8fc9ab0f69673721c7fc` ON `team_member`", undefined);
        await queryRunner.query("DROP TABLE `team_member`", undefined);
    }

}
