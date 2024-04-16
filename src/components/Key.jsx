import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import React, { useContext, memo } from 'react'
import { AppContext } from '../screens/Home'
import { ThemeContext } from '../App';

const Key = ({keyVal, disabled, green, yellow}) => {
  
  const {onSelectLetter, gameOver,} = useContext(AppContext);
  const {theme} = useContext(ThemeContext);
  

  const handleKeyPress = ()=>{
    if(gameOver.gameover) return;
    onSelectLetter(keyVal);
  };
  


  return (
    <TouchableOpacity style={[styles.key, {backgroundColor: theme.primary}, disabled? styles.disabled: green? styles.green: yellow? styles.yellow: null]} onPress={handleKeyPress}>
      <Text style={{fontWeight:700}}>{keyVal}</Text>
    </TouchableOpacity>
  )
}

export default memo(Key)

const styles = StyleSheet.create({
    key:{
        width:30,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:5,
        
        
    },
    disabled:{
      backgroundColor:"#618985"
    },
    green: {
      backgroundColor: "#04e762"
    },
    yellow: {
      backgroundColor: "#ffd500"
    }
})