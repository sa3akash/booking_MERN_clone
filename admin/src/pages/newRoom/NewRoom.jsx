import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import {roomInputs} from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(null)
  const [rooms, setRooms] = useState([])

  
  const {loading, data} = useFetch('/hotels')

  const handleChange = (e) =>{
    setInfo(prev => ({...prev, [e.target.id]: e.target.value}))
  }

  const navigate = useNavigate()

  const handleClick = async (e) =>{
    e.preventDefault();
    const roomNumbers = rooms.split(',').map(room => ({number: room}))
    try{
      await axios.post(`/rooms/create/${hotelId}`, {...info, roomNumbers})
      navigate("/rooms")
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} onChange={handleChange} id={input.id} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput">
                  <label>Rooms</label>
                  <textarea
                  placeholder="Give me room number between comma"
                  onChange={e=>setRooms(e.target.value)}>
                  </textarea>
                </div>
              <div className="formInput">
                  <label>Choose a hotel</label>
                  <select name="" id="hotelId" onChange={e=> setHotelId(e.target.value)}>
                    {
                      loading ? "Loading please wait..." : data && data.map(hotel => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))
                    }
                  </select>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
