import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState([])

  const {loading, data} = useFetch('/rooms')

  const handleChange = (e) =>{
    setInfo(prev => ({...prev, [e.target.id]: e.target.value}))
  }
  const handleSelect = (e) =>{
    const roomsValue = Array.from(e.target.selectedOptions, option => option.value);
    setRooms(roomsValue)
  }

  const navigate = useNavigate()
   // handle click for submit value
   const hangleClick = async (e) => {
    e.preventDefault();

    
    try{
      const list = await Promise.all(Object.values(files).map(async (file) =>{
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "booking_upload");
        const resUpload = await axios.post(
          'https://api.cloudinary.com/v1_1/sa2-avro/image/upload', data
          )
          const {url} = resUpload.data;
          return url;
      }))
      
      const newHotel = {
        ...info,
        rooms,
        photos: list
      }

     await axios.post('/hotels/create', newHotel)
     navigate('/hotels')

    }catch(err){
      console.log(err)
    }
    
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="file"
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} id={input.id} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput formSelect">
                  <label>Featured:</label>
                  <select name="" id="featured" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>

                <div className="checkbox">
                  <label>Rooms:</label>
                  <select name="" id="rooms" multiple onChange={handleSelect}>
                    {
                      loading ? "Loading please wait..." : data && data.map(room => (
                        <option key={room._id} value={room._id}>{room.title}</option>
                      ))
                    }
                  </select>
                </div>
              <button onClick={hangleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
