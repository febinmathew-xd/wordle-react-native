import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'

const Key = ({keyVal}) => {
  return (
    <TouchableOpacity style={styles.key}>
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