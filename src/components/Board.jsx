import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Letter from './Letter'

const Board = () => {
  return (
    <View style={styles.board}>
      <View style={{ flexDirection:'row', gap:5}}>
        <Letter letterPos={0} attemptVal={1}/>
        <Letter letterPos={2} attemptVal={1}/>
        <Letter letterPos={3} attemptVal={1}/>
        <Letter letterPos={4} attemptVal={1}/>
        <Letter letterPos={5} attemptVal={1}/>
      </View>

      <View style={{ flexDirection:'row', gap:5}}>
        <Letter letterPos={0} attemptVal={1}/>
        <Letter letterPos={2} attemptVal={1}/>
        <Letter letterPos={3} attemptVal={1}/>
        <Letter letterPos={4} attemptVal={1}/>
        <Letter letterPos={5} attemptVal={1}/>
      </View>

      <View style={{ flexDirection:'row', gap:5}}>
        <Letter letterPos={0} attemptVal={1}/>
        <Letter letterPos={2} attemptVal={1}/>
        <Letter letterPos={3} attemptVal={1}/>
        <Letter letterPos={4} attemptVal={1}/>
        <Letter letterPos={5} attemptVal={1}/>
      </View>

      <View style={{ flexDirection:'row', gap:5}}>
        <Letter letterPos={0} attemptVal={1}/>
        <Letter letterPos={2} attemptVal={1}/>
        <Letter letterPos={3} attemptVal={1}/>
        <Letter letterPos={4} attemptVal={1}/>
        <Letter letterPos={5} attemptVal={1}/>
      </View>

      <View style={{ flexDirection:'row', gap:5}}>
        <Letter letterPos={0} attemptVal={1}/>
        <Letter letterPos={2} attemptVal={1}/>
        <Letter letterPos={3} attemptVal={1}/>
        <Letter letterPos={4} attemptVal={1}/>
        <Letter letterPos={5} attemptVal={1}/>
      </View>

      <View style={{ flexDirection:'row', gap:5}}>
        <Letter letterPos={0} attemptVal={1}/>
        <Letter letterPos={2} attemptVal={1}/>
        <Letter letterPos={3} attemptVal={1}/>
        <Letter letterPos={4} attemptVal={1}/>
        <Letter letterPos={5} attemptVal={1}/>
      </View>
    </View>
  )
}

export default Board

const styles = StyleSheet.create({
    board : {
        width: '100%',
        height: 380,
        backgroundColor: '#000814',
        padding: 15,
        gap: 5,
        alignItems: 'center'
    }
})