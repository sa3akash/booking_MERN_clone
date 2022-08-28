import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { userInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({})

// hangle inpput
  const handleChange = (e) =>{
    setInfo(prev => ({...prev, [e.target.id]: e.target.value}))
  }

const navigate = useNavigate()
  // handle click for submit value
  const hangleClick = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "booking_upload");
    try{
      const resUpload = await axios.post(
        'https://api.cloudinary.com/v1_1/sa2-avro/image/upload', data
        )

      const {url} = resUpload.data;

      const newUser = {
        ...info,
        img: url
      }
      await axios.post('/auth/register', newUser)
      navigate("/users")
    }catch(err){
      console.log(err.response.data)
    }
    
  }


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} id={input.id} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button onClick={hangleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
