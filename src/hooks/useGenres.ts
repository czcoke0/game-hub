import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
export interface Genre{
    id: number;
    name:string;

}
interface FetchGenreResponse {
    count: number;
    results: Genre[];
  }
const useGenres=()=>{
    const [genres, setGenre] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    //loading skeleton
    const[isLoading, setLoading]=useState(false);
  
    useEffect(() => {
      const controller=new AbortController();
      //loading
      setLoading(true)
      apiClient
        .get<FetchGenreResponse>("/genres",{signal:controller.signal})
        .then((res) => {setGenre(res.data.results);setLoading(false)})
        .catch((err) => 
        {
            if(err instanceof CanceledError)return;
            setError(err.message)
            setLoading(false)
          });
        return()=> controller.abort()
    },[]);
    return {genres, error, isLoading}
}

export default useGenres