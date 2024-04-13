import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const LoadingIndicator = () => {
  return (

    <View style={styles.loadingContainer}>
      <StatusBar backgroundColor={"#000814"}/>
      
      <ActivityIndicator size={"large"} color={"#2196f3"} />
    </View>
  )
}

export default LoadingIndicator

const styles = StyleSheet.create({
  loadingContainer:{
    flex:1,
    backgroundColor: '#000814',
    alignItems: 'center',
    justifyContent: 'center'
  }
})