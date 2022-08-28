import React from 'react';
import styles from "./Feautured.module.css";
import useFetch from "../../hooks/useFetch";

const Feautured = () => {
    const {loading, data} = useFetch('/hotels/countByCity?cities=sherpur,jamalpur,dhaka');
console.log(data);
  return (
    <div className={styles.feautured}>

         {loading ? "Loading please wait..." : <>
            <div className={styles.feauturedItem}>
                <img src="https://cf.bstatic.com/xdata/images/city/540x270/697826.webp?k=654b3ee27af619021908dda0f01f04a5219d5e5bbaf419da792c5c14fa1fe785&o=" alt="featured1" />
                <div className={styles.feauturedTitle}>
                    <h1>Sherpur</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className={styles.feauturedItem}>
                <img src="https://cf.bstatic.com/xdata/images/city/540x270/690197.webp?k=1cfa3e949d9acff7feb22ff581d39330048102f14c16332954b66c397e2efd36&o=" alt="featured1" />
                <div className={styles.feauturedTitle}>
                    <h1>Jamalpur</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className={styles.feauturedItem}>
                <img src="https://cf.bstatic.com/xdata/images/city/540x270/689525.webp?k=289eb852eb6a67dcd79a1ca972966057eaf1ab73a8a68459612a956f4b291642&o=" alt="featured1" />
                <div className={styles.feauturedTitle}>
                    <h1>Dhaka</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div>
        </>}

    </div>
    
  )
}

export default Feautured