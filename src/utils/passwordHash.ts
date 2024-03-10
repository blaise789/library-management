import bcrypt from "bcryptjs"
async  function hashPassword(plainPassword:string):Promise<string>{
    
        const hashedPassword=await bcrypt.hash(plainPassword,10)
         return hashedPassword
 
    

}
export default hashPassword;