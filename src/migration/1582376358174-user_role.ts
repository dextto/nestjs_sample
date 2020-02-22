import {MigrationInterface, QueryRunner} from "typeorm";

export class userRole1582376358174 implements MigrationInterface {
    name = 'userRole1582376358174'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `role` enum ('user', 'admin', 'member') NOT NULL DEFAULT 'user'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`", undefined);
    }

}
