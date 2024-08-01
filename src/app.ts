import express from "express"
import userRouter from "./routes/user-routes"

function createApp() {
    const app = express()

    app.use(express.json())

    app.use("/api/users", userRouter)

    return app
}

export default createApp