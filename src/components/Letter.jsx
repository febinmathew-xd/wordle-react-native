import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useContext, useEffect, useState,  } from 'react'
import { AppContext } from '../screens/Home'
import Animated, {useSharedValue, interpolate, withTiming, Easing, useAnimatedStyle} from 'react-native-reanimated'

const Letter = ({letterPos, attemptVal}) => {

  



  const {board,
    setGreenKey, 
    setDisabledKey, 
    setYellowKey,
    correctWord, 
    currentAttempt,
    theme } = useContext(AppContext);

  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter!="" && correctWord.toUpperCase().includes(letter);
  const [flipped, setFlipped] = useState(false)

  //Animations - using reanimated

  const flipValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(()=>{
    console.log('correct', correct)
    console.log('almost', almost)
    console.log(theme)
    console.log(flipValue.value)
    

    const flipRotation = interpolate(flipValue.value, [0,0.5,1], [0, 90, 0])

    const backgroundColor = interpolate(flipValue.value, [0,1], [theme.primary, correct && currentAttempt.attempt> attemptVal? '#04e762' : almost && currentAttempt.attempt>attemptVal? "#ffd500": "#618985"])
    
    const textColor = flipValue.value ===1 ? styles.whiteText.color : theme.primary

    return {
      transform: [{rotateX: withTiming(`${flipRotation}deg`, {duration:500, })}],
      backgroundColor,
      color: textColor
    }


  })

  
  useEffect(()=>{
    flipValue.value = currentAttempt.attempt> attemptVal ? 1 :0



  },[currentAttempt.attempt, attemptVal])

  
    
    
   
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
    

  },[flipValue.value]);


  

  

  return (
   
    
       <Animated.View style={[styles.letter, animatedStyle]}>
      <Text style={[styles.text,]}>
        {board[attemptVal][letterPos]}
      </Text>
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