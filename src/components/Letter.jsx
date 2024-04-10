import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useContext, useEffect,  } from 'react'
import { AppContext } from '../screens/Home'

const Letter = ({letterPos, attemptVal}) => {

  const {board,
    setGreenKey, 
    setDisabledKey, 
    setYellowKey,
    correctWord, 
    currentAttempt,
    theme

  } = useContext(AppContext);

    const letter = board[attemptVal][letterPos];
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter!="" && correctWord.toUpperCase().includes(letter);
    
    
   
  useEffect(()=>{
     if (letter!="" && !correct && !almost){
      setDisabledKey((prev)=>[...prev, letter]);
      //api call to update disabledKey
     };
     if(letter !="" && correct){
      setGreenKey((prev)=> [...prev, letter]);
      //api call to update greenKey

     };
     if (letter!="" && almost){
      setYellowKey((prev)=> [...prev, letter]);
      //api call to update yellowKey
     };


  },[currentAttempt.attempt]);


  //animation

  

  return (
   
    
       <View style={[styles.letter, {borderColor:theme.primary, backgroundColor:theme.background} ,correct && currentAttempt.attempt>attemptVal? styles.green  : almost && currentAttempt.attempt>attemptVal? styles.yellow : currentAttempt.attempt>attemptVal?styles.grey : null  ]}>
      <Text style={[styles.text, {color:theme.primary}, currentAttempt.attempt>attemptVal ? styles.whiteText: null]}>
        {board[attemptVal][letterPos]}
      </Text>
    </View>
    
    
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