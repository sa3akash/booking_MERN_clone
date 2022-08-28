import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    country: {type: String, required: true},
    img: {type: String, required: true},
    city: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},

},{timestamps: true});


export default mongoose.model("User", userSchema, "users");