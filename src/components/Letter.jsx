import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../screens/Home'

const Letter = ({letterPos, attemptVal}) => {

  const {board,
    setGreenKey, 
    setDisabledKey, 
    setYellowKey,
    correctWord, 
    currentAttempt

  } = useContext(AppContext);

    const letter = board[attemptVal][letterPos];
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter!="" && correctWord.toUpperCase().includes(letter);
    const notCorrect = !correct && !almost && letter!="" && !correctWord.toUpperCase().includes(letter);
   
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


  return (
    <View style={[styles.letter,correct && currentAttempt.attempt>attemptVal? styles.green  : almost && currentAttempt.attempt>attemptVal? styles.yellow : currentAttempt.attempt>attemptVal?styles.grey : null  ]}>
      <Text style={[styles.text]}>
        {board[attemptVal][letterPos]}
      </Text>
    </View>
  )
}

export default Letter

const styles = StyleSheet.create({
    letter:{
        width: 50,
        height: 50,
        borderWidth: 0.5,
        borderRadius:1,
        borderColor: '#2196f3',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: "#000814"
        

    },
    green:{
        backgroundColor:"green"
    },
    yellow: {
      backgroundColor:"yellow"

    },
    grey: {
      backgroundColor:"gray"
      
    },
    text:{
      fontWeight:600, 
      fontSize:20 , 
      color: '#2196f3'
    },
    
})