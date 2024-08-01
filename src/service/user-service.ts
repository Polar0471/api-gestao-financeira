import { User } from "../models/user-models";
import { v4 as uuidv4 } from "uuid";
import { findUserByEmailRepository, userRegisterRepository, validateUserPasswordRepository } from "../repository/user-repository";
import * as httpHelper from "../utils/http-helper";

export const userLoginService = async (email: string, password: string) => {
    let response = null

    const user = await findUserByEmailRepository(email)
    if (!user) {
        response = await httpHelper.badRequest("Invalid email or password")
    }

    const validPassword = await validateUserPasswordRepository(password, user)
    if (!validPassword) {
        response = await httpHelper.badRequest("Invalid email or password")
    }

    response = await httpHelper.ok("Logged in")
    return response
}

export const userRegisterService = async (newUser: User) => {
    let response = null
    
    if (newUser) {
        newUser.id = uuidv4()
        await userRegisterRepository(newUser)
        response = httpHelper.ok(newUser)
    } else {
        response = httpHelper.noContent()
    }
    return response
}