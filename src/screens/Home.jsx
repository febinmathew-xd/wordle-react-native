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
import { getData, storeData } from '../utils/storage'


export const AppContext = createContext();
  

const Home = ({navigation}) => {
  const [profileVisible, setProfileVisible] = useState(false);

  
  const [board, setBoard] = useState([
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
]);

  const [currentAttempt, setCurrentAttempt] = useState({attempt:0, letter:0})
  const [disabledKey, setDisabledKey] = useState([]);
  const [greenKey, setGreenKey] = useState([]);
  const [yellowKey, setYellowKey] = useState([]);
  const [gameOver, setGameOver] = useState({gameover:false, guessedWord:false});
  const [correctWord, setCorrectWord] = useState("");
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
    
    Axios.get(`profile/?userId=${userData?.id}`).then((response)=>{
      
      setProfile(response.data)
    }).catch((error)=>{
      console.log(error)
      if(error?.response?.data?.error){
        console.log(error.response.data.error)
      }
    })

    //api call to get correct answer 

  

    

    //load game data stored in asyncStorage
    const loadGameData = async (correctWord) =>{
      console.log("correct word line107",correctWord)
      try{
        const answer = await getData("correctWord")
        console.log("answer loadgame data ", answer)

        if(answer===correctWord || answer===null){
          try{
               const gameData = await getData("gameData")
               console.log("gamedata load game data", gameData)
               setBoard(gameData.board)
               setCurrentAttempt(gameData.currentAttempt)
               setGameOver(gameData.gameOver)

               if(answer===null){
                storeData("correctWord", correctWord).then(()=>{}).catch(()=>{})
               }
              

          }catch(error){
            console.log(error)
          }
        }else{
          storeData("correctWord", correctWord).then(()=>{
            console.log("correct word stored")
          }).catch((error)=>console.log(error))
          storeData("gameData", {board:board, currentAttempt:currentAttempt, gameOver:gameOver}).then(()=>{
            console.log("default game data saved when correct answer changed")
          }).catch((error)=>console.log(error))
        }



      }catch(error){
        console.log(error)
      }
      

    }

    const fetchAnswer = async ()=>{
      try{
        const response = await Axios.get('get/answer/')
        setCorrectWord(wordList[response.data.correct_answer])
        console.log("is there",response.data)
        console.log(correctWord)
        loadGameData(wordList[response?.data?.correct_answer])
        
      }catch(error){
        console.log("answer fetching axios error", error)
      }
    };

    fetchAnswer();
   
    
    
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
      if(currentAttempt.attempt===0){
        //api call for profile update -- increment total games by 1
        Axios.patch('profile/', {id:userData?.id, data:{total:profile?.total+1}}).then((response)=>{
          console.log('total update patch operation response data', response?.data)
          setProfile(response?.data)
        }).catch((error)=>{
          console.log('axios error while updating patch operation of total',error)
        })
      }
      //api call to update board on backend
      //api call to update currentAttempt on backend


     
      
      setCurrentAttempt({attempt:currentAttempt.attempt+1, letter:0});
      storeData("gameData", {board:board, currentAttempt:{attempt:currentAttempt.attempt+1, letter:0}, gameOver:gameOver}).then(()=>{
        console.log("gameData updated for correct word in word list")
      }).catch((error)=>{
        console.log(error)
      })

     
      


    }
    else{
      setError(true);
    }
    if (currentWord.toLowerCase()===correctWord){
      setGameOver({gameover:true, guessedWord:true})


      storeData("gameData", {board:board, currentAttempt:{attempt:currentAttempt.attempt+1, letter:0}, gameOver:{gameover:true, guessedWord:true}}).then(()=>{
        console.log("gameData updated for game over for correct guess")
      }).catch((error)=>{
        console.log(error)
      })
      //api call to increment win count also update winstreak and update max winstreak if needed
      //update win distribution according to attempt value
      
      //api call to increment win count and update guess distribution

      const updateWonAndGuess= (id, data)=> {
        Axios.patch('profile/', {id:id, data: data} ).then((response)=>{
          console.log('won and guess distribution update respose', response?.data)
          setProfile(response.data)
        }).catch((error)=>console.log("error updating won and guess distribution", error))
  
      }

      const id = userData?.id
      const newWonNumber = profile?.won +1
      
      if (currentAttempt.attempt ===0){
        const data = {won:newWonNumber, guess_distribution_1: profile.guess_distribution_1+1}
        updateWonAndGuess(id, data);
        
      } else if(currentAttempt.attempt==1){
        const data = {won:newWonNumber, guess_distribution_2: profile.guess_distribution_2+1}
        updateWonAndGuess(id, data);
        
      }else if(currentAttempt.attempt==2){
        const data = {won:newWonNumber, guess_distribution_3: profile.guess_distribution_3+1}
        updateWonAndGuess(id, data);
        
      }else if(currentAttempt.attempt==3){
        const data = {won:newWonNumber, guess_distribution_4: profile.guess_distribution_4+1}
        updateWonAndGuess(id, data);
        
      }else if(currentAttempt.attempt==4){
        const data = {won:newWonNumber, guess_distribution_5: profile.guess_distribution_5+1}
        updateWonAndGuess(id, data);
        
      }else if(currentAttempt.attempt==5){
        const data = {won:newWonNumber, guess_distribution_6: profile.guess_distribution_6+1}
        updateWonAndGuess(id, data);
        
      }
      
     
      
    };

    if (currentAttempt.attempt ===6){
      setGameOver({gameover:true, guessedWord:false})


      storeData("gameData", {board:board, currentAttempt:{attempt:currentAttempt.attempt+1, letter:0}, gameOver:{gameover:true, guessedWord:false}}).then(()=>{
        console.log("gameData updated for game fail")
      }).catch((error)=>{
        console.log(error)
      })
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
    settingsView,
    profile
    

  }), [onDelete, setAvatar, onEnter, onSelectLetter,theme, setTheme,  
    currentAttempt, disabledKey, yellowKey, greenKey, setGreenKey, setYellowKey, 
    setDisabledKey,correctWord, gameOver, avatar,board, handleProfle, handleSettings, 
    profileView, settingsView, profile])












  return (
    <AppContext.Provider
    value={values}>
    <StatusBar backgroundColor={theme.primary}/>
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
        <Header onStatPress={handleProfle} onIconPress={handleSettings} setStatVisible={setProfileVisible}/>
        <Board/>
        <Keyboard/>

        <ProfileModal  visible={profileVisible} setVisible={setProfileVisible} />
    
    
          
        
        
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