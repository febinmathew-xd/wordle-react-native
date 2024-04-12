import { 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  view, 
  Modal, 
  View, 
  TouchableOpacity, 
  Text, } from 'react-native'

import { 
  Board, 
  Chart, 
  Header, 
  Keyboard, 
  ProfileDetails, 
  Settings, 
  Statistics, 
  ToggleNavigation } from '../components'

import React, { useState , createContext, useEffect, useCallback, useMemo, useContext,} from 'react'
import {colorTheme} from '../utils/Colors'
import { defaultBoard } from '../utils/utls'
import { wordList } from '../utils/wordList'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { avatarList } from '../utils/utls'
import ProfileModal from '../components/ProfileModal'
import Axios from '../utils/api'
import { AuthContext } from '../routes/Routes'


export const AppContext = createContext();
  

const Home = () => {
  const [profileVisible, setProfileVisible] = useState(false);

  
  const [board, setBoard] = useState(defaultBoard);

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
  const {userData} = useContext(AuthContext);
  const [profile, setProfile] = useState({})



  


  


  
  useEffect(()=>{

    //api call to get profile details

    Axios.get(`profile/?userId=${userData.userid}`).then((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      if(error?.response?.data?.error){
        console.log(error.response.data.error)
      }
    })
    
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
    setAvatar,
    handleProfle,
    handleSettings,
    profileView,
    settingsView
    

  }), [onDelete, setAvatar, onEnter, onSelectLetter,theme, setTheme,  
    currentAttempt, disabledKey, yellowKey, greenKey, setGreenKey, setYellowKey, 
    setDisabledKey,correctWord, gameOver, avatar,board, handleProfle, handleSettings, profileView, settingsView])












  return (
    <AppContext.Provider
    value={values}>
    <StatusBar backgroundColor={theme.primary}/>
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
        <Header onStatPress={handleProfle} onIconPress={handleSettings} setStatVisible={setProfileVisible}/>
        <Board/>
        <Keyboard/>

        <ProfileModal visible={profileVisible} setVisible={setProfileVisible} />
    
    
          
        
        
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
    

   
    
})