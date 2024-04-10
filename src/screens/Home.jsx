import { 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  view, 
  Modal, 
  View, 
  TouchableOpacity, 
  Text} from 'react-native'

import { 
  Board, 
  Chart, 
  Header, 
  Keyboard, 
  ProfileDetails, 
  Settings, 
  Statistics, 
  ToggleNavigation } from '../components'

import React, { useState , createContext, useEffect, useCallback, useMemo} from 'react'
import {colorTheme} from '../utils/Colors'
import { ArrayBoard, } from '../utils/utls'
import { wordList } from '../utils/wordList'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { avatarList } from '../utils/utls'


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
  const [wordSet, setWordSet] = useState(new Set(wordList));
  const [avatar, setAvatar] = useState(avatarList[1])
  const [theme, setTheme] = useState(colorTheme[0])
  const [profileView, setProfileView] = useState(true)
  const [settingsView, setSettingsView] = useState(false)



  console.log('board', board)
  console.log('currentAttempt', currentAttempt)
  console.log('disabled key', disabledKey)
  console.log('yellow key', yellowKey)
  console.log('green key', greenKey)
  console.log('theme', theme)
  console.log('avatar', avatar)
  console.log('game over', gameOver)

  


  
  useEffect(()=>{
    

    //api call to get board from backend and setBoard()
    //api call to get correct word and setWord()
    //api call to get disabledkey, yellowkey, green key and set their state
    //api call to get gameOver status and setGameOver()
    //api call to get currentAttempt state and setCurrentAttempt()
    
    


  },[])
  


  const onSelectLetter = useCallback( (keyVal)=> {
    if (currentAttempt.letter >4) return;
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letter] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({attempt:currentAttempt.attempt, letter:currentAttempt.letter+1});
  }, [currentAttempt, board])

  const onDelete =useCallback(() => {
    if (currentAttempt.letter===0) return;
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letter-1] = "";
    setBoard(newBoard);
    setCurrentAttempt({attempt:currentAttempt.attempt, letter:currentAttempt.letter-1});
  }, [currentAttempt, board]);

  const onEnter = useCallback(() => {
    if(currentAttempt.letter!==5) return;
    let currentWord = "";
    for(let i=0; i<5; i++){
      currentWord += board[currentAttempt.attempt][i]
    };

    if (wordSet.has(currentWord.toLowerCase())){
      //if(currentAttempt.attempt===0){
        //api call for profile update -- increment total games by 1
      //}
      //api call to update board on backend
      //api call to update currentAttempt on backend
      setFlipAnimation(true);
      setTimeout(() => {
        setCurrentAttempt({attempt:currentAttempt.attempt+1, letter:0});
        setFlipAnimation(false)
      }, 500);
    }
    else{
      setError(true);
    }
    if (currentWord.toLowerCase()===correctWord){
      setGameOver({gameover:true, guessedWord:true})
      //api call to increment win count also update winstreak and update max winstreak if needed
      //update win distribution according to attempt value
      //api call to update gaveOver status
    };

    if (currentAttempt.attempt ===6){
      setGameOver({gameover:true, guessedWord:false})
      //api call to update gameover status
    }



  },[board, currentAttempt, correctWord, wordSet])



  const handleProfle = useCallback(()=>{
    setProfileView(true)
    setSettingsView(false)
  },[])

  const handleSettings = useCallback(()=>{
    setSettingsView(true)
    setProfileView(false)
  },[])

  const values = useMemo(()=>({
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
    gameOver,
    avatar,
    theme,
    setTheme,
    setAvatar

  }), [onDelete, setAvatar, onEnter, onSelectLetter,theme, setTheme, board, 
    currentAttempt, disabledKey, yellowKey, greenKey, setGreenKey, setYellowKey, 
    setDisabledKey,correctWord, gameOver, avatar])












  return (
    <AppContext.Provider
    value={values}>
    <StatusBar backgroundColor={theme.primary}/>
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
        <Header setStatVisible={setStatVisible}/>
        <Board/>
        <Keyboard/>
    
    <Modal
    visible={statVisible}
    onRequestClose={()=> setStatVisible(false)}
    transparent={true}
    animationType='slide'>

    <View style={styles.modalContainer}>
      <View style={[styles.box, {backgroundColor:theme.background, borderColor:theme.primary}]}> 
      <View style={{position:'absolute', right:0, top:0}}>

        <TouchableOpacity style={{padding:10}} onPress={()=>setStatVisible(false)}>
            <Icon name='cancel' size={30} color={theme.primary} />
        </TouchableOpacity>
        
      </View>
      <ProfileDetails img={avatar} userName={'febin'} dateJoined={'May 2024'} />
      <ToggleNavigation isProfile={profileView} isSettings={settingsView} onPressProfile={handleProfle} onPressSettings={handleSettings}/>
     {profileView && <View>
      <Statistics/>
      <Chart/>
      </View>}
      {settingsView && <Settings/> }
      

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
        
        
        
         
    },
    box:{
     
      width: '100%',
      height: 470,
      borderWidth: 0.5,
     
      borderRadius:10,
      elevation: 10,
      paddingHorizontal:16
    },
    modalContainer: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
      paddingHorizontal: 20
    }

   
    
})