import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { AppContext } from '../screens/Home'

const Statistics = () => {
  
  const {theme, profile} = useContext(AppContext)
  



  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.value}>
          {profile.total}
        </Text>
        <Text style={[styles.label, {color:theme.primary}]}>
          Played
        </Text>

      </View>

      <View style={styles.subContainer}>
        <Text style={styles.value}>
          {profile.total===0? 0:Math.floor((profile.won/profile.total)*100)}
        </Text>
        <Text style={[styles.label, {color:theme.primary}]}>
          Win %
        </Text>

      </View>

      <View style={styles.subContainer}>
        <Text style={styles.value}>
          {profile.winstreak}
        </Text>
        <Text style={[styles.label, {color:theme.primary}]}>
          Current Streak
        </Text>

      </View>

      <View style={styles.subContainer}>
        <Text style={styles.value}>
          {profile.max_winstreak}
        </Text>
        <Text style={[styles.label, {color:theme.primary}]}>
          Max Streak
        </Text>

      </View>
    </View>
  )
}

export default Statistics

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10
    

  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    

  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity:0.9

  },
  label : {
    fontSize: 14,
    opacity: 0.7,
    fontWeight:'600'
    
    
  }
})