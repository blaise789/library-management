
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuthorsTable1709584272036 implements MigrationInterface {

        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "authors",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment",
                        },
                        {
                            name: "name",
                            type: "varchar",
                            length: "255",
                            isNullable: false
                        },
                        {
                            name: "email",
                            type: "varchar",
                            length: "255",
                            isNullable: false,
                            isUnique:true
                        },
                        {
                            name: "bio",
                            type: "text",
                            isNullable: true,
                          },
                        {
                            name:"createdAt",
                            type:"datetime",
                            default:"now()",
                            isNullable: true
                        },
                        {
                            name: "updatedAt",
                            type: "datetime",
                            default: "now()",
                            isNullable: true,
                          }
                    ]
    
    
    
    
                }
                ),
                true
    
            )
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("authors")
        }
    
    }
    

