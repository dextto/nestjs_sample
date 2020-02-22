import {MigrationInterface, QueryRunner} from "typeorm";

export class sign_urlUnique1582362927263 implements MigrationInterface {
    name = 'sign_urlUnique1582362927263'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `sign` ADD UNIQUE INDEX `IDX_b52969fde4e270bdb8a76a97c4` (`url`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `sign` DROP INDEX `IDX_b52969fde4e270bdb8a76a97c4`", undefined);
    }

}
