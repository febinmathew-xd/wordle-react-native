/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */




import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView , StatusBar, PermissionsAndroid} from 'react-native'

// import CallLogs from 'react-native-call-log'
import {  Login, Signup , Home} from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()

function App() {

  useEffect(()=> {
    
    const requestPermission = async () =>{
      try{
        const callLogPermission = PermissionsAndroid.PERMISSIONS.READ_CALL_LOG;
        
        
        const grandedCallLog = await PermissionsAndroid.request(
          callLogPermission, 
          {
            title: 'call log permission',
            message: 'This app need to access your call log',
            buttonPositive: 'ok',
            buttonNegative: 'cancel'
          }
        );

        if (grandedCallLog === PermissionsAndroid.RESULTS.GRANTED){
          console.log('call log permission granted')
          

        }
        else {
          console.log('call log permission denied')
        };
  
      } catch (error){
        console.log('error requesting permission', error)
      }

    };

    

    requestPermission();

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
