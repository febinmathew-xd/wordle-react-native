import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Letter = ({letterPos, attemptVal}) => {
  return (
    <View style={styles.letter}>
      <Text style={{fontWeight:600, fontSize:20 , color: '#2196f3'}}></Text>
    </View>
  )
}

export default Letter

const styles = StyleSheet.create({
    letter:{
        width: 50,
        height: 50,
        borderWidth: 0.5,
        borderRadius:1,
        borderColor: '#2196f3',
        alignItems:'center',
        justifyContent: 'center'
    }
})