import {Router} from "express"
import { loginValidator, registerValidator } from "../validator/auth.validator.js"
import { getMe, login, logout, refresh, register } from "../controller/auth.controller.js"
import { authenticate } from "../middleware/auth.middleware.js"

const router = Router()

router.post("/register",registerValidator,register)

router.post("/login",loginValidator,login)

router.post("/refresh-token",refresh)

router.get("/me",authenticate,getMe)

router.post("/logout",logout)

export default router