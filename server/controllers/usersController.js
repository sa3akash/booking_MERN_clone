import User from "../model/User.js";

const userController = {

    async update(req, res, next){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true}).select("-password -isAdmin")
            return res.status(200).json(updatedUser);
        }catch(err){
            next(err)
        }
    },

    async delete(req, res, next){
        try{
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json({message: "User deleted successfully"});
        }catch(err){
            next(err)
        }
    },

    async getOneUser(req, res, next){
        try{
            const user = await User.findById(req.params.id).select("-password -isAdmin")
            return res.status(200).json(user);
        }catch(err){
            next(err)
        }
    },

    async getAllUsers(req, res, next){
        
        try{
            const users = await User.find().select("-password -isAdmin")
            return res.status(200).json(users);
        }catch(err){
            next(err)
        }
    },

}

export default userController;