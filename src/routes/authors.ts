import express from "express"
import { AuthorsController } from "../http/controllers/AuthorsController"
import { ErrorHandler } from "../http/middlewares/ErrorHandler"
import { FileUploader } from "../http/middlewares/FileUploader"
import { AuthMiddleware } from "../http/middlewares/AuthMiddleware"

const authorsController=new AuthorsController()
const router=express.Router()
router.get("/",ErrorHandler.catch(AuthMiddleware.authenticate),ErrorHandler.catch(authorsController.getAuthors))
router.get("/:id",ErrorHandler.catch(authorsController.getById),ErrorHandler.handleErrors)

router.post("/",FileUploader.upload("image", "authors", 2 * 1024 * 1024),ErrorHandler.catch(authorsController.createAuthor),ErrorHandler.handleErrors)
export default router