import express from "express"
import { AuthorsController } from "../http/controllers/AuthorsController"
import { ErrorHandler } from "../http/middlewares/ErrorHandler"

const authorsController=new AuthorsController()
const router=express.Router()
router.get("/",ErrorHandler.catch(authorsController.getAuthors))
export default router;