import { createError } from "./createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) =>{

    const token = req.cookies.access_token;
    if(!token){
        return next(createError(403, "Your are not authenticated user"))
    }

    const user = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    if(!user){
        return next(createError(403, "Invalid token"))
    }
    req.user = user;
    next();
}


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(!req.user){
            return next(createError(403, "Please! login first"))
        }
        
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "you are not authorized user"))
        }
    })

}
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(!req.user){
            return next(createError(403, "Please! login first"))
        }

        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "you are not authorized admin"))
        }
    })
}

// 1 3 00