import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";

const roomController = {

   async createRoom (req, res, next) {

        const hotelId = req.params.hotelId;
        const newRoom = new Room(req.body)

        try{
            const savedRoom = await newRoom.save();
            try{
                await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}});

            }catch(err){
                next(err);
            }
            return res.status(200).json(savedRoom);
        }catch(err){
            next(err);
        }
   },

    async updateRoom(req, res, next){
        try{
            const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
            return res.status(201).json(updatedRoom);
        }catch(err){
            next(err)
        }
    },

    async deleteRoom(req, res, next){
        const hotelId = req.params.hotelId;
        try{
            await Room.findByIdAndDelete(req.params.id)
            try{
                await Hotel.findByIdAndUpdate(hotelId, {$pull: {rooms: req.params.id}});

            }catch(err){
                next(err);
            }
            return res.status(200).json({message: "Room deleted successfully"});
        }catch(err){
            next(err)
        }
    },

    async getOneRoom(req, res, next){
        try{
            const room = await Room.findById(req.params.id)
            return res.status(200).json(room);
        }catch(err){
            next(err)
        }
    },

    async getAllRooms(req, res, next){
        try{
            const rooms = await Room.find()
            return res.status(200).json(rooms);
        }catch(err){
            next(err)
        }
    },

    async updateRoomAvailability(req, res, next){

        try{
           await Room.updateOne({"roomNumbers._id": req.params.id},{$push: {
            "roomNumbers.$.unAvailableDates": req.body.dates
           }})
           return res.status(200).json({success: true, message: "Room availability updated successfully"});
        }catch(err){
            next(err)
        }
        
    },

}

export default roomController;