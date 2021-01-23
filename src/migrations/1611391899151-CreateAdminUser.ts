import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAdminUser1611391899151 implements MigrationInterface {
    name = 'CreateAdminUser1611391899151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `adminUser` (`id` varchar(36) NOT NULL, `username` varchar(50) NOT NULL, `password` varchar(128) NOT NULL, UNIQUE INDEX `IDX_58bd2b086488ba1ba90847a192` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_58bd2b086488ba1ba90847a192` ON `adminUser`");
        await queryRunner.query("DROP TABLE `adminUser`");
    }

}
