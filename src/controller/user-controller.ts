import {Request, Response } from "express"
import { getProfileService, userLoginService, userRegisterService } from "../service/user-service"

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const httpResponse = await userLoginService(email, password)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const userRegister = async (req: Request, res: Response) => {
    const bodyValue = req.body
    const httpResponse = await userRegisterService(bodyValue)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}

// endpoint onde o usuário conseguirá obter seus dados com base no token de login
export const getProfile = async (req: Request, res: Response) => {
    const { authorization } = req.headers
    const httpResponse = await getProfileService(authorization as string)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}