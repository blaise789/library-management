import * as dotenv from "dotenv"
import { DataSource } from "typeorm";
import { Author } from "./entities/Author";
import { User } from "./entities/User";
dotenv.config()
export const AppDataSource=new DataSource({
    type:"mysql",
    host:process.env.DB_HOST || "127.0.0.1",
    port:Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    logging:false,
    synchronize:true,
    entities:[Author,User],
    subscribers:[],
    migrations:["src/database/migrations/*.ts"]
   

}
    
)
