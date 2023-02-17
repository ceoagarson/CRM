import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "./catchAsyncError.middleware.ts";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

let UserTokens: string[] = []//for storing access tokens in memory

//authenticate user
export const isAuthenticatedUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.accessToken)
        return res.status(403).json({ message: "please login to access this resource" })
    if (!UserTokens.includes(req.cookies.accessToken))
        return res.status(403).json({ message: "login again ! session expired" })
    jwt.verify(
        req.cookies.accessToken,
        process.env.JWT_ACCESS_USER_SECRET || "some random secret",
        async (err: any, decodedData: any) => {
            if (err) {
                return res.status(403).json({ message: "login again ! session expired" })
            }
            if (decodedData) {
                req.user = await User.findById(decodedData.id)
                next();
            }
        }
    );
});

//check owner
export const isOwner = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.roles) {
        if (req.user.roles.includes("owner")) return next();
        return res.status(403).json({ message: "!must be owner" });
    }
    return res.status(401).json({ message: "not authorised to access this resource" });
});

//check admin
export const isAdmin = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.roles) {
        if (req.user.roles.includes("admin")) return next();
        return res.status(403).json({ message: "!must be admin" });
    }
    return res.status(401).json({ message: "not authorised to access this resource" });
});

// login
export const sendUserToken = (res: Response, accessToken: string) => {
    if (accessToken)
        UserTokens.push(accessToken)
    const Expiry = Number(process.env.COOKIE_EXPIRE) || 1
    res.cookie("accessToken", accessToken, {
        maxAge: Expiry * 60 * 1000,//1 minute by default
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    });
}
//logout
export const deleteToken = async (res: Response) => {
    const options = {
        maxAge: 0,
        httpOnly: true
    };
    res.cookie("accessToken", null, options);
};
