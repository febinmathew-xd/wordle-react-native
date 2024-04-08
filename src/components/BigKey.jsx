import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons"
import Colors from '../utils/Colors'
import { AppContext } from '../screens/Home'

const BigKey = ({keyVal}) => {

    const {onDelete, onEnter, gameOver} = useContext(AppContext)

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
    <TouchableOpacity style={styles.bigKey} onPress={handlePress}>
     {keyVal==='delete' ? <Icon name='keyboard-backspace'/> : <Text>Enter</Text>}
    </TouchableOpacity>
  )
}

export default BigKey

const styles = StyleSheet.create({
    bigKey: {
        backgroundColor:Colors.blue.primary,
        width: 50,
        height:50,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})