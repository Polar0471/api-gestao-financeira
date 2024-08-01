import { User } from "../models/user-models";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid";
import { findUserByEmailRepository, userRegisterRepository, validateUserPasswordRepository } from "../repository/user-repository";
import * as httpHelper from "../utils/http-helper";

export const userLoginService = async (email: string, password: string) => {
    const user: User | undefined = await findUserByEmailRepository(email)
    
    if (!user) {
        return await httpHelper.badRequest("Invalid email or password")
    }

    const validPassword = await validateUserPasswordRepository(password, user)
    if (!validPassword) {
        return await httpHelper.badRequest("Invalid email or password")
    }

    return await httpHelper.ok("Logged in")
}

export const userRegisterService = async (newUser: User) => {
    let response = null
    
    if (newUser) {
        newUser.id = uuidv4()
        newUser.password = await bcrypt.hash(newUser.password, 10)
        await userRegisterRepository(newUser)
        response = httpHelper.created()
    } else {
        response = httpHelper.noContent()
    }
    return response
}