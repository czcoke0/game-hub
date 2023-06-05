import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

interface FetchGenreResponse<T> {
    count: number;
    results: T[];
  }
const useData=<T>(endpoint:string)=>{//t is generic type parameter name
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    //loading skeleton
    const[isLoading, setLoading]=useState(false);
  
    useEffect(() => {
      const controller=new AbortController();
      //loading
      setLoading(true)
      apiClient
        .get<FetchResponse<T>>(endpoint,{signal:controller.signal})
        .then((res) => {setData(res.data.results);setLoading(false)})
        .catch((err) => 
        {
            if(err instanceof CanceledError)return;
            setError(err.message)
            setLoading(false)
          });
        return()=> controller.abort()
    },[]);
    return {data, error, isLoading}
}

export default useData