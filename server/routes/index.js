import express from "express"
import AuthController from "../controllers/authController.js";
import hotelsController from "../controllers/hotelsController.js";
import roomController from "../controllers/roomsController.js";
import userController from "../controllers/usersController.js";
const router = express.Router();
import {verifyUser, verifyAdmin} from "../services/verifyToken.js"




// hotels
router.post('/hotels/create', verifyAdmin, hotelsController.create)
router.put('/hotels/:id', verifyAdmin, hotelsController.update)
router.delete('/hotels/:id', verifyAdmin, hotelsController.delete)
router.get('/hotels/:id', hotelsController.getOneHotel)
router.get('/hotels', hotelsController.getAllHotels)
router.get('/hotels/countByCity', hotelsController.countByCity)
router.get('/hotels/countByType', hotelsController.countByType)
router.get('/hotels/room/:id', hotelsController.getHotelRooms)

// auth
router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)

// user
router.put('/users/:id', verifyUser, userController.update)
router.delete('/users/:id', verifyUser, userController.delete)
router.get('/users/:id', verifyUser, userController.getOneUser)
router.get('/users', verifyAdmin, userController.getAllUsers)

// rooms
router.post('/rooms/create/:hotelId', verifyAdmin, roomController.createRoom)
router.put('/rooms/:id', verifyAdmin, roomController.updateRoom)
router.delete('/rooms/:hotelId/:id', verifyAdmin, roomController.deleteRoom)
router.get('/rooms/:id', verifyAdmin, roomController.getOneRoom)
router.get('/rooms', roomController.getAllRooms)
router.put('/rooms/availability/:id', roomController.updateRoomAvailability)


export default router;