import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Author } from "../../database/entities/Author";
import { CreateAuthorDto } from "../dtos/CreateAuthorDto";
import { validateOrReject } from "class-validator";
import { ResponseUtil } from "../../utils/Response";

export class AuthorsController {
    async createAuthor(req: Request, res: Response, next: NextFunction) {
        const authorData = req.body
    // console.log(req.file?.filename)
    authorData.image=req.file?.filename
    const dto=new CreateAuthorDto()
    Object.assign(dto,authorData)
    console.log(dto)
    await validateOrReject(dto)
    const repo=AppDataSource.getRepository(Author)
    const author=repo.create(authorData)
    await repo.save(author)

        return ResponseUtil.sendResponse(res, "user created successfully",author, 200)


    }
    async getAuthors(req: Request, res: Response): Promise<Response> {
        // const authors = await AppDataSource.getRepository(Author).find()
        const builder=await AppDataSource.createQueryBuilder().orderBy("id")
        return res.status(200).json({
            success: true,
            data: authors


        })

    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        const author = await AppDataSource.getRepository(Author).findOneByOrFail({
            id: Number(id),
        })
        return ResponseUtil.sendResponse<Author>(res, "author fetched  successfully", author)
        //    return res.json({id});

    }
}
