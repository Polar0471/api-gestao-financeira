import {Request, Response } from "express"
import { userLoginService, userRegisterService } from "../service/user-service"

export const userLogin = async (req: Request, res: Response) => {
    const bodyValue = req.body
    const httpResponse = await userLoginService(bodyValue.email, bodyValue.password)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const userRegister = async (req: Request, res: Response) => {
    const bodyValue = req.body
    const httpResponse = await userRegisterService(bodyValue)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}