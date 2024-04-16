import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Error = ({theme, handlePress}) => {
  return (
    <View style={[styles.container,{backgroundColor:theme.background}]}>
        <StatusBar backgroundColor={theme.background}/>
     <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10}}>
        <Icon name='cloud-off' size={30} color={theme.primary} />
        <Text style={{fontSize:20, fontWeight:'900', marginLeft:10}}>Unable to connect</Text>
     </View>
     <Text style={{textAlign:'center', fontWeight:'600', opacity:0.8}}>Oops! It looks like you're offline</Text>
     <Text style={{textAlign:'center', fontWeight:'600', opacity:0.8}}>Please check your internet connection </Text>
     <TouchableOpacity onPress={()=> handlePress()} style={[styles.button, {backgroundColor:theme.primary}]}>
        <Text style={{fontWeight:'bold', fontSize:16}}>Try Again</Text>
     </TouchableOpacity>
    </View>
  )
}

export default Error

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        paddingBottom:50
    },
    button:{
        paddingHorizontal: 40,
        paddingVertical:10,
        borderRadius:10,
        marginTop:30
    }
})