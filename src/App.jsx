/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */




import React, {useState, useEffect} from 'react'

import { NavigationContainer } from '@react-navigation/native';

import { getPermission } from './utils/permissions';
import Routes from './routes/Routes';





function App() {

  

  useEffect(()=> {
    
    const fetchCallLog = async ()=>{
      try {
        const logs = await getPermission();
        
      }catch (error) {
        console.log(error)
      }

    }

    fetchCallLog();
    
  }, []);
  
  return (
   <NavigationContainer>
      <Routes/>
   </NavigationContainer>
  )
}


export default App;
