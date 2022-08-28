import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";

const hotelsController = {

    async create(req, res, next){

        const newHotel = new Hotel(req.body);
        try{
            const savedHotel = await newHotel.save();
            return res.status(200).json(savedHotel);
        }catch(err){
            next(err)
        }
    },

    async update(req, res, next){
        try{
            const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
            return res.status(200).json(updatedHotel);
        }catch(err){
            next(err)
        }
    },

    async delete(req, res, next){
        try{
            await Hotel.findByIdAndDelete(req.params.id)
            return res.status(200).json({message: "Hotel deleted successfully"});
        }catch(err){
            next(err)
        }
    },

    async getOneHotel(req, res, next){
        try{
            const hotel = await Hotel.findById(req.params.id)
            return res.status(200).json(hotel);
        }catch(err){
            next(err)
        }
    },

    
    async getAllHotels(req, res, next){
        const {min, max, ...others} = req.query;
        try{
            const hotels = await Hotel.find({...others, price: {$gt: min || 1, $lt: max || 9999}}).limit(req.query.limit)
            return res.status(200).json(hotels);
        }catch(err){
            next(err)
        }
    },

    async countByCity(req, res, next){
        const cities = req.query.cities.split(",");
        try{
            const list = await Promise.all(cities.map(city=>{
                return Hotel.countDocuments({city:city})
  
            }))
            return res.status(200).json(list);
        }catch(err){
            next(err)
        }
    },

    async countByType(req, res, next){
        try{
            const hotelCount = await Hotel.countDocuments({ type: "hotel" });
            const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
            const resortCount = await Hotel.countDocuments({ type: "resort" });
            const villaCount = await Hotel.countDocuments({ type: "villa" });
            const cabinCount = await Hotel.countDocuments({ type: "cabin" });

            res.status(200).json([
            { type: "hotels", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
            ]);
        }catch(err){
            next(err)
        }
    },
    async getHotelRooms(req, res, next){
        const id = req.params.id;
        try{
            const hotel = await Hotel.findById({_id: id});
            const listRooms = await Promise.all(hotel.rooms.map(room =>{
                return Room.findById(room);
            }))

            return res.status(200).json(listRooms);
        }catch(err){
            return next(err)
        }
    },

}

export default hotelsController;