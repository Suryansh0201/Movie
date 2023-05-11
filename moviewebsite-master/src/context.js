import React, { useContext, useEffect, useState } from "react";
import useFetch from "./useFetch";
const API_URL = `http://www.omdbapi.com/?apikey=b8e7a327&`;

const AppContext = React.createContext();


const AppProvider = ({ children }) => {
  const getMovies = async(url)=>{
    try{
      const res = await fetch(url);
      const data = res.json();
      console.log(data);
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getMovies(API_URL);
  }, [])
  const [query, setQuery] = useState("hacker");
  const { isLoading, isError, movie } = useFetch(`&s=${query}`);

  return (
    <AppContext.Provider value={{ query, movie, setQuery, isLoading, isError }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
