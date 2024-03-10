import { ErrorHandler } from "../http/middlewares/ErrorHandler";
import { AuthController } from "../http/controllers/AuthController";
import express from "express"
const router = express.Router();
const authController = new AuthController()
router.post("/register",ErrorHandler.catch(authController.register))

router.post("/login",ErrorHandler.catch(authController.login))
export default router;