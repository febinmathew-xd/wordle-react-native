import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'




const Header = ({setStatVisible}) => {
  return (
    <View style={styles.header}>
      <Text
      style={styles.title}>Wordle</Text>
      <View style={{flexDirection: 'row', alignItems:'center', gap:8, opacity:0.9}}>

        <TouchableOpacity onPress={()=>setStatVisible(true)}>
          <Icon  name='leaderboard' size={30}  />
        </TouchableOpacity>
        
         <TouchableOpacity>
           <Icon name='help' size={28} />
         </TouchableOpacity>
         
      </View>
      
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header:{
    width: '100%',
    height: 70,
    backgroundColor: '#2196f3',
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  title: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 22,
    
  }
})



