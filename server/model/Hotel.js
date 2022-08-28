import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    type: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true},
    distance: {type: String, required: true},
    description: {type: String, required: true},
    photos: {type: [String]},
    rooms: {type: [String]},
    price: {type: Number, required: true},
    rating: {type: Number, min: 0, max: 5},
    featured: {type: Boolean, default: false},

},{timestamps: true});


export default mongoose.model("Hotel", hotelSchema, "hotels");