import { Roles } from "../../constants/Role";
import { DBTable } from "../../constants/DBtable";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { hash } from "bcryptjs";

@Entity(DBTable.USERS)
export class User{

    @PrimaryGeneratedColumn("uuid")
    id:string
    @Column()
    name:string
    @Column()
    password:string
    @Column()
    email:string
    @Column({default:Roles.USER})
    role:number
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
    toResponse():User{
        const responseUser=new User();
        responseUser.id=this.id,
        responseUser.name=this.name
        responseUser.email=this.email;
        responseUser.role=this.role;
        return responseUser;

    }
    // @BeforeInsert()
//     async hashPassword(){
//    this.password=await hash(this.password,12);
//     }
}