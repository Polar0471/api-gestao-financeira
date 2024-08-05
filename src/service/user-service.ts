import { User } from "../models/user-models";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid";
import { findUserByEmailRepository, findUserByIdRepository, userRegisterRepository, validateUserPasswordRepository } from "../repository/user-repository";
import * as httpHelper from "../utils/http-helper";
import jwt from "jsonwebtoken"


type JwtPayload = {
    id: string
}


export const userLoginService = async (email: string, password: string) => {
    const user: User | undefined = await findUserByEmailRepository(email)
    
    if (!user) {
        return await httpHelper.badRequest("Invalid email or password")
    }

    const validPassword = await validateUserPasswordRepository(password, user)
    if (!validPassword) {
        return await httpHelper.badRequest("Invalid email or password")
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '8h'})
    
    const {password:_, ...userLogin} = user

    return await httpHelper.ok({
        user: userLogin,
        token: token
    })
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

export const getProfileService = async (authorization: string) => {

    if (!authorization || authorization == undefined || authorization == null) {
        return await httpHelper.unauThorized("not authorized")
    }

    const token = authorization.split(' ')[1]

    // vai retornar o id do usuário caso o token exista
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

    const user: User | undefined = await findUserByIdRepository(id)

    if (!user) {
        return await httpHelper.unauThorized("not authorized")
    }

    const {password:_, ...loggedUser} = user

    return await httpHelper.ok(loggedUser)
}