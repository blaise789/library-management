import { Not } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidatorOptions, registerDecorator } from "class-validator";

@ValidatorConstraint({async:true})
export class isUniqueConstraint implements ValidatorConstraintInterface{

   async validate(value: any, args: ValidationArguments): Promise<boolean> {
        // throw new Error("Method not implemented.");
        const [entity,field]=args.constraints
        // console.log(args.constraints)
        const repo=AppDataSource.getRepository(entity)
        const isUpdate:boolean=args.object["id"]!==undefined
        let count=0
        console.log(isUpdate)
        if(!isUpdate){
            count=await repo.count({where:{[field]:value}})
        }
        else{
            count=await repo.count({where:{[field]:value,id:Not(args.object["id"])}})

        }
        return count<=0;
    }
   public defaultMessage(): string {
        throw new Error(`$property is already in use`)
    }



}
export function IsUnique(entity:any,field:string,validationOptions?:ValidatorOptions){
    return function(object:Object,propertName:string){
        registerDecorator({
            target:object.constructor,
         propertyName:propertName,
         options:validationOptions,
         constraints:[entity,field],
         validator:isUniqueConstraint
        })
    }
}