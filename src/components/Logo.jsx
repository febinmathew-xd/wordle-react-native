import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Logo = () => {
    
  return (
    <View style={styles.container}>
      <Text style={styles.blockWhite}></Text>
      <Text style={styles.blockWhite}></Text>
      <Text style={styles.blockWhite}></Text>
      <Text style={styles.blockWhite}></Text>
      
      <Text style={styles.blockDark}></Text>  
      <Text style={styles.blockBlue}></Text>
      <Text style={styles.blockBlue}></Text>
      <Text style={styles.blockBlue}></Text>
      <Text style={styles.blockBlue}></Text>

    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
    blockWhite:  {
        width: 15,
        height:15,
        backgroundColor: '#42a5f5',
        borderWidth:0.5,
        borderColor: '#000814',
        borderRadius: 2
          
    },
    blockBlue:  {
      width: 15,
      height:15,
      backgroundColor: '#0d47a1',
      borderWidth:0.5,
      borderColor: '#000814',
      borderRadius: 2
        
  },
  blockDark:  {
    width: 15,
    height:15,
    backgroundColor: '#1976d2',
    borderWidth:0.5,
    borderColor: '#000814',
    borderRadius: 2
      
},
container:{
  maxWidth:45,
  maxHeight:45,
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  borderRadius:10
}
})