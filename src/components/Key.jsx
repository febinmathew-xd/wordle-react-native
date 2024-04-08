import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../screens/Home'

const Key = ({keyVal}) => {
  const {onSelectLetter, gameOver} = useContext(AppContext);

  const handleKeyPress = ()=>{
    if(gameOver.gameover) return;
    onSelectLetter(keyVal);
  };
  


  return (
    <TouchableOpacity style={styles.key} onPress={handleKeyPress}>
      <Text style={{fontWeight:700}}>{keyVal}</Text>
    </TouchableOpacity>
  )
}

export default Key

const styles = StyleSheet.create({
    key:{
        width:30,
        height: 50,
        backgroundColor: '#2196f3',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:5,
        
        
    }
})