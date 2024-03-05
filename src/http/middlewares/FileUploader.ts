import multer from "multer";
import path from "path";
import fs from "fs"
import crypto from "crypto"
export class FileUploader{
    static upload(
fileFieldName:string,
folderName:string,
fileSize:number,
fileTypes:string[]=["image/png", "image/jpeg"]

    ){
        const storage=multer.diskStorage({
            destination:(req,file,cb)=>{
            const folder=path.resolve(`uploads/${folderName}`)
            if(!fs.existsSync(folder)){
                fs.mkdirSync(folder)
            }
            cb(null,folder)
            },
            filename:(req,file,cb)=>{
                cb(null,crypto.randomBytes(16).toString("hex")+path.extname(file.originalname))
            }

        })

    }
}