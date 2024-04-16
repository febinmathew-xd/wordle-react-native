import React, { createContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/Routes';
import { colorTheme } from './utils/Colors';
import { getData } from './utils/storage';


export const ThemeContext = createContext();



function App() {

  const [theme, setTheme] = useState(colorTheme[0])

  useEffect(()=>{

    getData('theme').then((result)=>{
      if(result!=null){
        setTheme(result)
        console.log('theme', result)
      }
    }).catch((error)=>console.log(error))



  }, [])

  

  
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <NavigationContainer>
      <Routes/>
   </NavigationContainer>
    </ThemeContext.Provider>
   
  )
}


export default App;
