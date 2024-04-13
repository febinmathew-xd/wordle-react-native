import React, { createContext, useEffect, useState } from 'react'
import { getData } from '../utils/storage'
import AppRoutes from './AppRoutes'
import AuthRoutes from './AuthRoutes'
import { LoadingIndicator } from '../components';


export const AuthContext = createContext();


const Routes = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        
        getData("userData").then((response)=>{
            if (response !=null){
                setUserData(response)
                setIsAuthenticated(true)
                
                console.log("async data",response)

            }else{
                setUserData(response)
            }
        }).catch((error)=>{
            console.log("error while fetching userdata for authentication in routes", error)
            setIsAuthenticated(false)
            
        }).finally(()=>{
            setLoading(false)
        })




    },[isAuthenticated])


    if(loading){
        return <LoadingIndicator/>
    }



  return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, userData, setUserData}}>
            {isAuthenticated ? <AppRoutes/> : <AuthRoutes/>}
        </AuthContext.Provider>
        
    
  )
}

export default Routes
