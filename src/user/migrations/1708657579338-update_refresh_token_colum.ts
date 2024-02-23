import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRefreshTokenColum1708657579338 implements MigrationInterface {
    name = 'UpdateRefreshTokenColum1708657579338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refreshToken" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refreshToken" SET NOT NULL`);
    }

}
