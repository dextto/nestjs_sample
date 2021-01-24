import {MigrationInterface, QueryRunner} from "typeorm";

export class AdminUser1611484008533 implements MigrationInterface {
    name = 'AdminUser1611484008533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `admin_user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, UNIQUE INDEX `IDX_840ac5cd67be99efa5cd989bf9` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_840ac5cd67be99efa5cd989bf9` ON `admin_user`");
        await queryRunner.query("DROP TABLE `admin_user`");
    }

}
