import React from 'react';
import { useState } from 'react';
import styles from "./Login.module.css";
import { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"
import {useNavigate} from "react-router-dom"
 
const Login = () => {
    const [creadintial, setCredentials] = useState({
        userandemail: undefined,
        password: undefined
    })
    const {loading, error, dispatch} = useContext(AuthContext)


    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };

      const navigate = useNavigate()

    const hangleClick = async (e) => {
        e.preventDefault();
        dispatch({type: "LOADING"})
        try{
            const res = await axios.post("/auth/login", creadintial)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
            navigate('/')
        }catch(err){
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
        }
    }

  return (
    <div className={styles.login}>
      <div className={styles.lContainer}>
        <input
          type="text"
          placeholder="Email or username"
          id="userandemail"
          onChange={handleChange}
          className={styles.lInput}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className={styles.lInput}
        />
        <button disabled={loading} onClick={hangleClick} className={styles.lButton}>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login;