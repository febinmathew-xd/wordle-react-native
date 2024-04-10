import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons"

import { AppContext } from '../screens/Home'

const BigKey = ({keyVal}) => {

    const {onDelete, onEnter, gameOver, theme} = useContext(AppContext)

    const handlePress =()=> {
        if (gameOver.gameover) return;

        if(keyVal === "enter"){
            onEnter();
        }
        if (keyVal==='delete'){
            onDelete();
        }

    }


  return (
    <TouchableOpacity style={[styles.bigKey, {backgroundColor:theme.primary}]} onPress={handlePress}>
     {keyVal==='delete' ? <Icon name='keyboard-backspace' size={22} /> : <Text style={{fontWeight:700}}>Enter</Text>}
    </TouchableOpacity>
  )
}

export default BigKey

const styles = StyleSheet.create({
    bigKey: {
        
        width: 50,
        height:50,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})