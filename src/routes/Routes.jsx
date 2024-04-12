import React, { createContext, useEffect, useState } from 'react'
import { getData } from '../utils/storage'
import AppRoutes from './AppRoutes'
import AuthRoutes from './AuthRoutes'


export const AuthContext = createContext();


const Routes = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        
        getData("userData").then((response)=>{
            if (response !=null){
                setIsAuthenticated(true)
                setUserData(response)
                console.log(response)

            }
        }).catch((error)=>{
            console.log("error while fetching userdata for authentication in routes", error)
            setIsAuthenticated(false)
            
        })




    },[isAuthenticated])



  return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, userData, setUserData}}>
            {isAuthenticated ? <AppRoutes/> : <AuthRoutes/>}
        </AuthContext.Provider>
        
    
  )
}

export default Routes
