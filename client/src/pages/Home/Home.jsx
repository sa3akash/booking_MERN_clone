import React from 'react';
import Feautured from '../../components/Feautured/Feautured';
import FeauturedProperty from '../../components/FeauturedProperty/FeauturedProperty';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MailList from '../../components/MailList/MailList';
import Navbar from '../../components/Navbar/Navbar';
import PropertyList from '../../components/PropertyList/PropertyList';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
        <Navbar />
        <Header />
        <div className={styles.homeContainer}>
            <Feautured />
            
            <h1>Browse by property type</h1>
            <PropertyList />

            <h1>Homes guests love</h1>
            <FeauturedProperty />
            <MailList />
            <Footer />
        </div>
    </div>
  )
}

export default Home