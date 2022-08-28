import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import styles from "./List.module.css";
import {useLocation} from "react-router-dom";
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/SearchItem/SearchItem';
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [openDate, setOpenDate] = useState(false);

  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const {loading, data, error, reFetchData} = useFetch(
    `/hotels?city=${destination}&min=${min || 1}&max=${max || 9999}`
    );

  const handleClick = () => {
    reFetchData();
  }
  
  return (
    <>
      <Navbar />
      <Header type="list"/>

      <div className={styles.listContainer}>
        <div className={styles.listWrapper}>
          <div className={styles.listSearch}>
            <h1>Search</h1>

            <div className={styles.lsItem}>
              <label>Destination</label>
              <input type="text" placeholder='Search...' value={destination}
              onChange={(e)=> setDestination(e.target.value)}/>
            </div>

            <div className={styles.lsItem}>
              <label>Check-in Date</label>
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

            <div className={styles.lsItem}>
              <label>Options</label>

            <div className={styles.optionBox}>
              <div className={styles.optionItem}>
                <span>Min price (per night)</span>
                <input type="number" onChange={(e)=> setMin(e.target.value)}/>
              </div>
              <div className={styles.optionItem}>
                <span>Max price (per night)</span>
                <input type="number" onChange={(e)=> setMax(e.target.value)}/>
              </div>
              <div className={styles.optionItem}>
                <span>Adult</span>
                <input type="number" min={1} placeholder={options.adult}/>
              </div>
              <div className={styles.optionItem}>
                <span>Children</span>
                <input type="number" min={0} placeholder={options.children}/>
              </div>
              <div className={styles.optionItem}>
                <span>Room</span>
                <input type="number" min={1} placeholder={options.rooms} />
              </div>    
            </div>
            <button className={styles.searchBoxButton} onClick={handleClick}>Search</button>
            </div>
          </div>


          <div className={styles.listResults}>

                {loading ? "Loading please wait..." : <>
                  {data && data.map(hotel=> (
                    <SearchItem hotel={hotel}  key={hotel._id}/>
                  ))}
                
                </> }
            

          </div>
        </div>
      </div>
    </>
  )
}

export default List;