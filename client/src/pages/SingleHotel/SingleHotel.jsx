import React, { useContext, useState } from 'react';
import styles from "./SingleHotel.module.css";
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import {FaMapMarkerAlt,FaArrowAltCircleLeft, FaArrowAltCircleRight, FaTimesCircle} from "react-icons/fa";
import MailList from "../../components/MailList/MailList"
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import {Navigate, useParams} from "react-router-dom";
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import {useNavigate} from "react-router-dom"
import ReserveModal from '../../components/ReserveModal/ReserveModal';

const SingleHotel = () => {

  const [slideNumber, setSlideNumber] = useState(0);
  const [openImage, setOpenImage] = useState(false);
  const [openBookModal, setOpenBookModal] = useState(false);

  const handleOpenImage = (i) => {
    setOpenImage(!openImage);
  }

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    }else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  }

  const {id} = useParams();
  const {loading, data} = useFetch(`/hotel/${id}`);


  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];

  const {date, options} = useContext(SearchContext)
  const {user} = useContext(AuthContext)


  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

const days = dayDifference(date[0].endDate, date[0].startDate);

const navigate = useNavigate()
  const handleBookNow = () => {
    if(user){
      setOpenBookModal(true);
    }else{
      navigate('/login')
    }
  }

  return (
    <>
      <Navbar />
      <Header type='list'/>
      <div className={styles.hotelContainer}>
      {loading ? "Loading please wait..." : <>


         {/* image slider */}
         {openImage && 
              <div className={styles.imageSlider}>
                <FaTimesCircle onClick={()=> setOpenImage(false)} className={styles.cros}/>
                <FaArrowAltCircleLeft className={styles.arrow} onClick={()=> handleMove("l")}/>
                <div className={styles.sliderWrapper}>
                  <img src={data?.photos[slideNumber]} alt="sliderimage" />
                </div>
                <FaArrowAltCircleRight className={styles.arrow} onClick={()=> handleMove("r")}/>
              </div>
          }

         <div className={styles.hotelWrapper}>
              <h1>{data?.name}</h1>
              <div className={styles.hotelAddress}>
                  <FaMapMarkerAlt />
                  <span>{data?.address}</span>
              </div>
              <div className={styles.hotelDistance}>
                  <span>Excelant location {data?.distance}</span>
                  <p>Book a stay over {data?.price} BDT at this property and get free airport texi</p>
              </div>
              <button className={styles.topButton} onClick={handleBookNow}>Reserve or Book Now!</button>

              <div className={styles.hotelImagesContainer}>
                {
                  data.photos?.map((photo,i)=>(
                    <div key={i} className={styles.hotelImage}>
                        <img onClick={()=> handleOpenImage(i)} src={photo} alt="propertyImage" />
                    </div>
                  ))
                }
              </div>

              <div className={styles.hotelDetails}>
                  <div className={styles.hotelDetailsText}>
                    <h1>{data?.title}</h1>
                    <p>{data?.description}</p>
                  </div>
                  <div className={styles.hotelDetailsPrice}>
                    <h2>Perfect for a {days}-night stay!</h2>
                    <p>Don't worry – clicking this button won't charge you anything!</p>
                    <h3><b>${data.price * days * options.rooms}</b> ({days} nights)</h3>
                    <button onClick={handleBookNow}>Reserve or Book Now!</button>
                  </div>
              </div>
          </div>
         
         </>}
        
      </div>
      <MailList />
      <div className={styles.footerContainer}>
        <div className={styles.footer}>
        <Footer />
        </div>
      </div>
      {openBookModal && <ReserveModal setOpenBookModal={setOpenBookModal} hotelId={id}/>}
    </>
  )
}

export default SingleHotel;