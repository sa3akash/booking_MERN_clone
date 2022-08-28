import React from 'react';
import styles from "./FeauturedProperty.module.css";
import useFetch from "../../hooks/useFetch";

const FeauturedProperty = () => {
    const {loading, data} = useFetch('/hotels?featured=true&limit=4');
  return (
    <div className={styles.feauturedProperty}>

        {loading ? "Loading please wait.. " : <>

            {data && data.map(item => (
                <div className={styles.feauturedPropertyItem} key={item._id}>
                    <img src={item.photos[0]} alt="property" />
                    <div className={styles.feauturedPropertyDetails}>
                        <span>{item.name}</span>
                        <span>{item.city}</span>
                        <h2>Starting from BDT {item.price}</h2>

                        {item.rating && (
                            <div className={styles.feauturedReviews}>
                                <button>{item.rating}</button>
                                <h3>Wonderful</h3>
                            <span>90 reviews</span>
                        </div>

                        )}
                        
                    </div>
            </div>
            ))}
        
        </>}

      


    </div>
  )
}

export default FeauturedProperty;