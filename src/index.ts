import * as dotenv from "dotenv"
import app from "./app"
import { AppDataSource } from "./database/data-source"
dotenv.config()
const PORT = process.env.PORT || 3000
AppDataSource.initialize().then( async()=>{
    console.log("db connected")
}).catch((err)=>{console.error(err)})
app.listen(PORT, () => {
    console.log(`the server  is listening:${PORT}`)
})