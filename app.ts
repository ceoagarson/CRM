// imports package and modules
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary";
import helmet from "helmet";
import cors from "cors";
import { MulterError } from 'multer';
import { connectDatabase } from './config/db';
import UserRoutes from "./routes/user.routes"
import OrganizationRoutes from "./routes/organization.route"
import LeadRoutes from "./routes/lead.routes"
import AccountRoutes from "./routes/account.route"
import OpportunityRoutes from "./routes/opportunity.route"
import ActivityRoutes from "./routes/activity.routes"
import path from 'path';

// app variables
const app = express()
dotenv.config();
const PORT = Number(process.env.PORT) || 5000
const HOST = process.env.HOST || "http://localhost"
const ENV = process.env.NODE_ENV || "development"
// start -> app configuration

app.use(express.json())
app.use(cookieParser());
app.use(helmet());
if (ENV === "development") {
    app.use(cors({
        origin: ['http://localhost:3000'],
        credentials: true
    }))
}
connectDatabase();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
app.use("/api/v1", UserRoutes)
app.use("/api/v1", OrganizationRoutes)
app.use("/api/v1", LeadRoutes)
app.use("/api/v1", AccountRoutes)
app.use("/api/v1", OpportunityRoutes)
app.use("/api/v1", ActivityRoutes)

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof MulterError)
        return res.status(400).json({ message: "please select required no of files and field names" })
    res.status(500).json({
        message: err.message || "unknown  error occured"
    })
})

// end -> app configuration
// start-> server configurations
if (!PORT) {
    console.log("Server Port not specified in the environment")
    process.exit(1)
}
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at ${HOST}:${PORT}`);
});
// end-> server configurations
