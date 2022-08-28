import React, { useContext, useState } from 'react';
import styles from "./ReserveModal.module.css";
import {FaTimesCircle} from "react-icons/fa"
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReserveModal = ({setOpenBookModal, hotelId}) => {
  const [selected, setSelected] = useState([])

  const {loading, data} = useFetch(`/hotels/room/${hotelId}`)

  const handleSelect = (e) => {
    const checkedIput = e.target.checked;
    const value = e.target.value;
    setSelected(checkedIput ? [...selected, value] : selected.filter(item => item !== value))
    
  }

  const {date} = useContext(SearchContext)

  // start date and end date convart to array
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
   
    return dates;
  };
    // start date and end date convart to array work end
    const alldates = getDatesInRange(date[0].startDate, date[0].endDate);
    /// if room not available

    const isAvailable = (roomNumber) => {
      const isFound = roomNumber.unAvailableDates.some((element) =>
        alldates.includes(new Date(element).getTime())
      );
      return !isFound;
    };

const navigete = useNavigate()

  const handleClick = async () => {
    try{
      await Promise.all(selected.map((roomId)=>{
        const res = axios.put(`/rooms/availability/${roomId}`, {dates: alldates});
        return res.data;
      }))
     setOpenBookModal(false)
     navigete("/")
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className={styles.reserveModal}>
        {loading ? "Loading Please Wait..." : <>
        
        <div className={styles.reservedContainer}>
           <FaTimesCircle onClick={()=> setOpenBookModal(false)} className={styles.rClose}/>
           <span>Select your rooms: </span>
           {data && data.map(item => (
            <div className={styles.rItem} key={item._id}>
                <div className={styles.rItemInfo}>
                    <h2>{item.title}</h2>
                    <span>Max people: <b>{item.maxPeople}</b></span>
                    <p>Price: <b>{item.price}</b> BDT</p>
                </div>
                <div className={styles.rItemRoom}>
                    {item.roomNumbers.map(roomNumber=>(
                      <div className={styles.roomNumberContainer} key={roomNumber._id}>
                          <label>{roomNumber.number}</label>
                          <input type="checkbox" value={roomNumber._id}
                          onChange={handleSelect} disabled={!isAvailable(roomNumber)}
                          />
                      </div>
                    ))}
                </div>
            </div>
           ))}
          <button className={styles.reserveButton} onClick={handleClick}>Reserve Now!</button>
        </div>

        </>}
    </div>
  )
}

export default ReserveModal;



// 2 54 00 