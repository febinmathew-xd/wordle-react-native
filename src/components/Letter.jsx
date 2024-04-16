import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useContext, useEffect, useState,  } from 'react'
import { AppContext } from '../screens/Home'
import Animated, {useSharedValue, interpolate, withTiming, Easing, useAnimatedStyle, withDelay} from 'react-native-reanimated'
import { ThemeContext } from '../App'

const Letter = ({letterPos, attemptVal}) => {

  



  const {board,
    setGreenKey, 
    setDisabledKey, 
    setYellowKey,
    correctWord, 
    currentAttempt,
   } = useContext(AppContext);

  const {theme} = useContext(ThemeContext);

  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter!="" && correctWord.toUpperCase().includes(letter);
  const DELAY = 200

  //Animations - using reanimated

  const flipValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(()=>{
    
    

    const flipRotation = interpolate(flipValue.value, [0,0.5,1], [0, -90, 0])

    const backgroundColor = flipValue.value <=0.5? theme.background: flipValue.value>0.5? (correct? '#04e762': almost? '#ffd500':'#618985'): null

    const borderColor = flipValue.value <=0.5? theme.primary: flipValue.value>0.5? (correct? '#04e762': almost? '#ffd500':'#618985'): null
    
    

    return {
      transform: [{rotateX: `${flipRotation}deg`}],
      backgroundColor,
      borderColor
    }


  })

  const animtedTextStyle = useAnimatedStyle(()=>{
    const color = flipValue.value <=0.5 ? theme.primary : 'white'
    return {color}
  })

  
  useEffect(()=>{
    flipValue.value = currentAttempt.attempt> attemptVal ? withDelay(letterPos*DELAY, withTiming(1, {duration:800})) : 0



  },[currentAttempt.attempt])

  
    
    
   
  useEffect(()=>{

    
      
    
     if (letter!="" && !correct && !almost){
      setDisabledKey((prev)=>[...prev, letter]);
      
     };
     if(letter !="" && correct){
      setGreenKey((prev)=> [...prev, letter]);
      
     };
     if (letter!="" && almost){
      setYellowKey((prev)=> [...prev, letter]);
      
     };
   

    

  },[currentAttempt.attempt]);


  

  

  return (
   
    
       <Animated.View style={[styles.letter, animatedStyle]}>
      <Animated.Text style={[styles.text, animtedTextStyle]}>
        {board[attemptVal][letterPos]}
      </Animated.Text>
    </Animated.View>
    
    
    
  )
}

export default memo(Letter) 

const styles = StyleSheet.create({
    letter:{
        width: 50,
        height: 50,
        borderWidth: 0.5,
        borderRadius:1,
        
        alignItems:'center',
        justifyContent: 'center',
        
        

    },
    green:{
        backgroundColor:"#04e762",
        borderColor:'#04e762'
    },
    yellow: {
      backgroundColor:"#ffd500",
      borderColor:"#ffd500"

    },
    grey: {
      backgroundColor:"#618985",
      borderColor: '#618985'
      
    },
    text:{
      fontWeight:'bold', 
      fontSize:26, 
      
    },
    whiteText:{
      color:'white'
    }
    
})