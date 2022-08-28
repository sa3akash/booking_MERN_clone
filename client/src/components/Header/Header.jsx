import React, { useContext, useState } from 'react';
import styles from './Header.module.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {FaBed, FaFighterJet, FaCar, FaTaxi, FaCalendarAlt, FaUserAlt} from 'react-icons/fa';
import { DateRange } from "react-date-range";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({type}) => {
    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [destination, setDestination] = useState('');
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        rooms: 1
    });

    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

      const handleOptions = (name, operation) => {
            setOptions(prev => {
                return{
                    ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1
                }
            })
      }

      const navigate = useNavigate();

       // context work
       const {dispatch} = useContext(SearchContext)
       const {user} = useContext(AuthContext)

      const handleClick = () => {
        dispatch({type: "NEW_SEARCH", payload: {city: destination, date: date, options: options}})
        navigate("/hotels", { state: {destination, date, options}});
      }

  return (
    <div className={styles.header}>
        <div className={
            type==="list" ? `${styles.headerContainer} ${styles.listMode} `:`${styles.headerContainer}`
        }>
            <div className={styles.headerList}>
                <div className={`${styles.headerItem} ${styles.active}`}>
                    <FaBed />
                    <span>Stays</span>
                </div>
                <div className={styles.headerItem}>
                    <FaFighterJet />
                    <span>Flights</span>
                </div>
                <div className={styles.headerItem}>
                    <FaCar />
                    <span>Car rentals</span>
                </div>
                <div className={styles.headerItem}>
                    <FaBed />
                    <span>Attractions</span>
                </div>
                <div className={styles.headerItem}>
                    <FaTaxi />
                    <span>Airport taxis</span>
                </div>
            </div>

           { type !== 'list' &&
            <> 
            <h1 className={styles.headerTitle}>A lifetime of discounts? It's genius.</h1>
            <p className={styles.headerDesc}> Get rewarded for your travels – unlock instant savings of 10% or more with a free Lamabooking account</p>
            {!user && <button className={styles.headerButton}>Sign in / Register</button>}

    {/* header search */}

            <div className={styles.headerSearch}>
                <div className={styles.headerSearchItem}>
                    <FaBed />
                    <input type="text" value={destination} placeholder='Where are you going?'
                    onChange={(e)=> setDestination(e.target.value)}/>
                </div>
                <div className={styles.headerSearchItem}>
                    <FaCalendarAlt />
                    <span onClick={()=> setOpenDate(!openDate)}>
                        {
                        `${format(date[0].startDate, "dd/MM/yyyy")}
                        - 
                        ${format(date[0].endDate, "dd/MM/yyyy")}`
                        }
                    </span>
                   
                   {openDate && 
                   <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                    className={styles.rangeConponent}
                  />}
                    
                </div>

                <div className={styles.headerSearchItem}>
                    <FaUserAlt />
                    <span onClick={()=> setOpenOptions(!openOptions)}>
                        {`${options.adult} adult - ${options.children} children - ${options.rooms} rooms`}
                    </span>
                    {openOptions && 
                        <div className={styles.roomsOptions}>
                            <div className={styles.optionsItem}>
                                <span>Adult</span>
                                <div className={styles.optionsCounterButton}>
                                    <button disabled={options.adult <= 1} onClick={()=> handleOptions("adult", "d")}>-</button>
                                    <span>{options.adult}</span>
                                    <button onClick={()=> handleOptions("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className={styles.optionsItem}>
                                <span>Children</span>
                                <div className={styles.optionsCounterButton}>
                                    <button disabled={options.children <= 0} onClick={()=> handleOptions("children", "d")}>-</button>
                                    <span>{options.children}</span>
                                    <button onClick={()=> handleOptions("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className={styles.optionsItem}>
                                <span>Rooms</span>
                                <div className={styles.optionsCounterButton}>
                                    <button disabled={options.rooms <= 1} onClick={()=> handleOptions("rooms", "d")}>-</button>
                                    <span>{options.rooms}</span>
                                    <button onClick={()=> handleOptions("rooms", "i")}>+</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <button className={styles.searchButton} onClick={handleClick}>Search</button>
            </div> 
            </>
            }
        </div>
    </div>
  )
}

export default Header;