import { Roles } from "../../constants/Role";
import { DBTable } from "../../constants/DBtable";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1709895359113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: DBTable.USERS,
            columns: [
              {
                name: "id",
                type: "varchar",
                isPrimary: true,
                isUnique: true,
                generationStrategy: "uuid",
              },
              {
                name: "name",
                type: "varchar",
              },
              {
                name: "email",
                type: "varchar",
                isUnique: true,
              },
              {
                name: "password",
                type: "varchar",
              },
              {
                name: "role",
                type: "int",
                default: Roles.USER,
              },
              {
                name: "createdAt",
                type: "datetime",
                default: "now()",
                isNullable: true,
              },
              {
                name: "updatedAt",
                type: "datetime",
                default: "now()",
                isNullable: true,
              },
            ],
          }),
          true
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DBTable.USERS);
      }

}
