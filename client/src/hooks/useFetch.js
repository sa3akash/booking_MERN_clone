import {useEffect, useState} from "react";
import axios from "axios";

const useFetch = (url) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=>{

        const fetchData = async () => {
            setLoading(true)
            try{
                const res = await axios.get(url)
                setData(res.data)
                setLoading(false)
            }catch(err){
                setError(err)
                setLoading(false)
            } 
        }
        fetchData();

    },[url])
// re fetch data if nedded
    const reFetchData = async () => {
        setLoading(true)
        try{
            const res = await axios.get(url)
            setData(res.data)
            setLoading(false)
        }catch(err){
            setError(err)
            setLoading(false)
        } 
    }

    return {data, loading, error, reFetchData}

}


export default useFetch;