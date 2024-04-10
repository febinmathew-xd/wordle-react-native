import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../screens/Home'


const ThemeBox = ({obj}) => {
   
    const {setTheme, theme} = useContext(AppContext);

  return (
    <TouchableOpacity onPress={()=> {setTheme(obj)}}  style={styles.colorContainer}>
      <View style={{flexDirection:'row'}}>
      <View 
      style={[styles.colorBox , 
      {borderTopLeftRadius:25, 
      borderBottomLeftRadius:25, 
      backgroundColor:obj.primary,
      borderTopWidth:1,
      borderLeftWidth:1,
      borderBottomWidth:1,
      borderColor: 'white'

      }]}></View>
      <View 
      style={[styles.colorBox, 
      {borderTopRightRadius:25, 
      borderBottomRightRadius:25,
      backgroundColor:obj.background,
      borderTopWidth:1,
      borderBottomWidth:1,
      borderRightWidth:1,
      borderColor:'white'}]}></View>
      </View>
      <Text style={[{fontSize:12, fontWeight:'600', paddingTop:5}, obj.id===theme.id? {color:theme.primary}: null]}>{obj.name}</Text>
    </TouchableOpacity>
  )
}

export default ThemeBox

const styles = StyleSheet.create({
    colorBox:{
        width:25,
        height:50,
       
    },
    colorContainer:{
        
       
        width:60,
        alignItems:'center'
    }
})