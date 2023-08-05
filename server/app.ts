import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary";
import helmet from "helmet";
import cors from "cors";
import { MulterError } from 'multer';
import { connectDatabase } from './config/db';
import UserRoutes, { upload } from "./routes/user.routes";
import LeadRoutes from "./routes/lead.routes";
import path from 'path';
import morgan from "morgan";
import {parse} from "comment-json"
const app = express()

//env setup
dotenv.config();
const PORT = Number(process.env.PORT) || 5000
const HOST = process.env.HOST || "http://localhost"
const ENV = process.env.NODE_ENV || "development"

app.use(express.json({ limit: '30mb' }))
app.use(cookieParser());

//logger
app.use(morgan('tiny'))

//helmet config
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "img-src": ["'self'", "https://res.cloudinary.com/"],
        },
    })
);

//cors for devlopment
if (ENV === "development") {
    app.use(cors({
        origin: ['http://localhost:3000'],
        credentials: true
    }))
}

//mongodb database
connectDatabase();

//cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});



//server routes
app.use("/api/v1", UserRoutes)
app.use("/api/v1", LeadRoutes)

app.post("/api/v1/test", upload.single("visiting_card"), (req: Request, res: Response) => {
    console.log(JSON.parse(req.body.body))
    res.status(200).json({
        file: req.file,
        data: req.body,
    })
})
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
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at ${HOST}:${PORT}`);
});
