import bcrypt from "bcrypt";
import User from "../model/User.js";
import { createError } from "../services/createError.js";
import jwt from "jsonwebtoken";

const AuthController = {

    async register (req, res, next) {
        const {username, email, password} = req.body;

        if(!password || !username || !email) {
            return next(createError(403, "all fields are required"))            
        }

        const salt = bcrypt.genSaltSync(10);
        const hash_password = bcrypt.hashSync(password, salt);
        try{
            const findUser = await User.findOne({$or:[{username: username},{email: email}]})
            if(findUser) {
                return next(createError(403, "User already exists"))
            }
            const newUser = new User({
                ...req.body,
                password: hash_password,
            })
            await newUser.save();
            return res.status(201).json({message: "User has been registered"});
        }catch(err){
            return next(err);
        }
    },

    async login (req, res, next) {
        const {userandemail, password} = req.body;

        if(!userandemail || !password) {
            return next(createError(403, "All fields are required"));
        }
        try{
            const user = await User.findOne({$or: [
                {username: userandemail},
                {email: userandemail}
            ]});
            if(!user){
                return next(createError(404, "User not found"))
            }

            const verify_password = bcrypt.compareSync(password, user.password);
            if(!verify_password){
                return next(createError(400, "Password incorrect"))
            }

            const token = jwt.sign(
                {id: user._id, isAdmin: user.isAdmin},
                process.env.JWT_TOKEN_KEY,
                {expiresIn: '15d'}
                ) 

                // password same name assain req.body variable then 
            const {isAdmin,password:dataPass, ...others} = user._doc;

            return res.cookie("access_token", token,{
                httpOnly: true,
            }).status(200).json({details:{...others}, isAdmin});

        }catch(err){
            return next(err);
        }
    },
}


export default AuthController;