import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  const {user, dispatch} = useContext(AuthContext)

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'});
    localStorage.removeItem("user")
    navigate('/');
  }
  return (
    <div className={styles.navbar}>
        <div className={styles.navContainer}>
            <Link to="/"><span>Booking</span></Link>

           {!user && 
           <div className={styles.navItem}>
                <Link to='/register'>
                  <button>Register</button>
                </Link>
                <Link to='/login'>
                  <button>Sign in</button>
                </Link>
            </div>}

            {user && 
            <div className={styles.logoutContainer}>
              <h3>{user.username}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>}
        </div>
    </div>
  )
}

export default Navbar;