import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const InputField = ({placeholder,password}) => {
  return (
    <TextInput
    style={styles.input}
    placeholder={placeholder}
    secureTextEntry={password}
    underlineColorAndroid='#003566'
    
    />
  )
}

export default InputField

const styles = StyleSheet.create({
    input:{
        backgroundColor: "#003566",
        padding: 10,
        borderRadius:10,
        borderWidth:1,
        width:'100%',
        borderColor:'#003566',
        
        
    
        
    }
})