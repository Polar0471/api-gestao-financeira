import fs from "fs/promises"
import { User } from "../models/user-models"
import bcrypt from "bcrypt"

export const findUserByEmailRepository = async (email: string): Promise<User|undefined> => {
    const data = await fs.readFile("src/data/userData.json", "utf-8")
    const users: User[] = await JSON.parse(data)
    const user = users.find(user => user.email === email)
    return user
}

export const validateUserPasswordRepository = async (password: string, user: User): Promise<boolean> => {
    const isValidPassword = bcrypt.compare(user.password, password)
    return isValidPassword
}

export const userRegisterRepository = async (newUser: User) => {
    const data = await fs.readFile("src/data/userData.json", "utf-8")
    const users: User[] = JSON.parse(data)
    users.push(newUser)
    fs.writeFile("src/data/userData.json", JSON.stringify(users, null, 2))
}