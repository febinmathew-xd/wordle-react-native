import { 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  view, 
  Modal, 
  View, 
  TouchableOpacity } from 'react-native'

import { 
  Board, 
  Header, 
  Keyboard, 
  ProfileDetails, 
  Statistics, 
  ToggleNavigation } from '../components'

import React, { useState , createContext, useEffect} from 'react'
import Colors from '../utils/Colors'
import { ArrayBoard } from '../utils/utls'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const AppContext = createContext();
  

const Home = () => {
  const [statVisible, setStatVisible] = useState(false);

  
  const [board, setBoard] = useState(ArrayBoard);
  const [currentAttempt, setCurrentAttempt] = useState({attempt:0, letter:0})
  const [disabledKey, setDisabledKey] = useState([]);
  const [greenKey, setGreenKey] = useState([]);
  const [yellowKey, setYellowKey] = useState([]);
  const [gameOver, setGameOver] = useState({gameover:false, guessedWord:false});
  const [correctWord, setCorrectWord] = useState("febin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [flipAnimation, setFlipAnimation] = useState(false);
  const [wordSet, setWordSet] = useState(new Set());

  
  useEffect(()=>{
    

    //api call to get board from backend and setBoard()
    //api call to get correct word and setWord()
    //api call to get disabledkey, yellowkey, green key and set their state
    //api call to get gameOver status and setGameOver()
    //api call to get currentAttempt state and setCurrentAttempt()



  },[])
  


  const onSelectLetter = (keyVal)=> {
    if (currentAttempt.letter >4) return;
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letter] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({attempt:currentAttempt.attempt, letter:currentAttempt.letter+1});
  };

  const onDelete =() => {
    if (currentAttempt.letter===0) return;
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letter-1] = "";
    setBoard(newBoard);
    setCurrentAttempt({attempt:currentAttempt.attempt, letter:currentAttempt.letter-1});
  };

  const onEnter = () => {
    if(currentAttempt.letter!==5) return;
    let currentWord = "";
    for(let i=0; i<5; i++){
      currentWord += board[currentAttempt.attempt][i]
    };

    if (wordSet.has(currentWord.toLowerCase())){
      if(currentAttempt.attempt===0){
        //api call for profile update -- increment total games by 1
      }
      //api call to update board on backend
      //api call to update currentAttempt on backend
      setFlipAnimation(true);
      setTimeout(() => {
        setCurrentAttempt({attempt:currentAttempt.attempt+1, letter:0});
        setFlipAnimation(false)
      }, 450);
    }
    else{
      setError(true);
    }
    if (currentWord===correctWord){
      setGameOver({gameover:true, guessedWord:true})
      //api call to increment win count also update winstreak and update max winstreak if needed
      //update win distribution according to attempt value
      //api call to update gaveOver status
    };

    if (currentAttempt.attempt ===6){
      setGameOver({gameover:true, guessedWord:false})
      //api call to update gameover status
    }



  };

  const values = {
    onDelete,
    onEnter,
    onSelectLetter,
    board,
    currentAttempt,
    disabledKey,
    yellowKey,
    greenKey,
    setYellowKey,
    setGreenKey,
    setDisabledKey,
    correctWord,
    gameOver

  }












  return (
    <AppContext.Provider
    value={values}>
    <StatusBar backgroundColor={'#2196f3'}/>
    <SafeAreaView style={styles.container}>
        <Header setStatVisible={setStatVisible}/>
        <Board/>
        <Keyboard/>
    
    <Modal
    visible={statVisible}
    onRequestClose={()=> setStatVisible(false)}
    transparent={true}
    animationType='slide'>

    <View style={styles.modalContainer}>
      <View style={styles.box}> 
      <View style={{position:'absolute', right:0, top:0}}>

        <TouchableOpacity style={{padding:10}} onPress={()=>setStatVisible(false)}>
            <Icon name='cancel' size={30} color={Colors.blue.primary} />
        </TouchableOpacity>
        
      </View>

      </View>

    </View>
    </Modal>
        
          
        
        
    </SafeAreaView>
    </AppContext.Provider>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        
        
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000814'
        
        
         
    },
    box:{
      backgroundColor: Colors.blue.background,
      width: '100%',
      height: 450,
      borderWidth: 0.5,
      borderColor: Colors.blue.primary,
      borderRadius:10,
      elevation: 10
    },
    modalContainer: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
      paddingHorizontal: 20
    }

   
    
})