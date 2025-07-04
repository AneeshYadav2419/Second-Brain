import { NextFunction,Request,Response } from "express";
import  jwt  from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";


import { JWT_PASSWORD } from "./config";

export  const UserMiddleware = (req : Request , res: Response, next:NextFunction)=>{
    const header = req.headers["authorization"]
   const decoded = jwt.verify(header as string ,JWT_PASSWORD)
    
    if(decoded){
       // req.userId = decoded.id;
         req.userId = (decoded as JwtPayload).id as string;
        next();
    }
    else {
        res.status(403).json({
            message:"Yo are logged in "
        })
    }
}