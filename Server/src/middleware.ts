import { NextFunction, Response, Request } from "express";
import { JWT_PASS } from "./config";
import jwt from "jsonwebtoken";


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers['token'];
    const decoded = jwt.verify(header as string, JWT_PASS)
    
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next()
    } else{
        res.status(403).json({
            message: "Invalid token"
        })
    }
}