import { Router } from "express"
import * as userController from "../controller/user-controller"

const userRouter = Router()

userRouter.post("/register", userController.userRegister)
userRouter.post("/login", userController.userLogin)

export default userRouter