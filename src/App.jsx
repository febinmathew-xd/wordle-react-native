/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */




import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView , StatusBar, PermissionsAndroid} from 'react-native'
import {  Login, Signup , Home} from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getPermission } from './utils/permissions';


const Stack = createNativeStackNavigator()



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
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
        name='Login'
        component={Login}
        options={{headerShown:false}}/>
        <Stack.Screen
        name='Signup'
        component={Signup}
        options={{headerShown:false}}/>
        <Stack.Screen
        name='Home'
        component={Home}
        options={{headerShown:false}}/>
      </Stack.Navigator>
   </NavigationContainer>
  )
}


export default App;
