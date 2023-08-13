import express, { NextFunction, Request, Response } from 'express';

import compression from "compression"
import { createServer } from "http"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary";
import cors from "cors";
import { MulterError } from 'multer';
import { connectDatabase } from './config/db';
import UserRoutes from "./routes/user.routes";
import LeadRoutes from "./routes/lead.routes";
import BotRoutes from "./routes/bot.routes";
import path from 'path';
import morgan from "morgan";
import { Server } from "socket.io";
import { Socket } from "socket.io";
import { createWhatsappClient, getCurrentUser, userJoin, userLeave } from "./utils/CreateWhatsappClient";


const app = express()
export const server = createServer(app)


//env setup
dotenv.config();
const PORT = Number(process.env.PORT) || 5000
const HOST = process.env.HOST || "http://localhost"
const ENV = process.env.NODE_ENV || "development"
let AppSocket: Socket;

app.use(express.json({ limit: '30mb' }))
app.use(cookieParser());
app.use(compression())

//logger
app.use(morgan('tiny'))


//mongodb database
connectDatabase();

let origin = ""
if (ENV === "development") {
    origin = "http://localhost:3000"
    app.use(cors({
        origin: [origin],
        credentials: true
    }))
}

let io: Server | undefined = undefined
io = new Server(server, {
    cors: {
        origin: origin,
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("socket connected")
    AppSocket = socket
    socket.on('JoinRoom', async (id: string, path: string) => {
        console.log("running in room", id, path)
        const user = userJoin(id)
        socket.join(user.id)
        if (io)
            createWhatsappClient(id, path, io)
        socket.on("disconnect", (reason) => {
            let user = getCurrentUser(id)
            if (user)
                userLeave(user.id)
            console.log(`socket ${socket.id} disconnected due to ${reason}`);
        });
    })

});






//cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});



//server routes
app.use("/api/v1", UserRoutes)
app.use("/api/v1", LeadRoutes)
app.use("/api/v1", BotRoutes)


//react app handler
if (ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "build/", "index.html"));
    })
}
else {
    app.use("*", (_req: Request, res: Response, _next: NextFunction) => {
        res.status(404).json({ message: "resource not found" })
    })
}
//error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof MulterError)
        return res.status(400).json({ message: "please select required no of files and field names" })
    res.status(500).json({
        message: err.message || "unknown  error occured"
    })
})

//server setup
if (!PORT) {
    console.log("Server Port not specified in the environment")
    process.exit(1)
}
server.listen(PORT, () => {
    console.log(`running on ${HOST}:${PORT}`)
});

export { io }