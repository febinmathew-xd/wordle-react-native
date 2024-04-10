import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AppContext } from '../screens/Home'
import Avatar from './Avatar'




const Header = ({ onStatPress, onIconPress, setStatVisible}) => {
  const {theme, avatar} = useContext(AppContext);
  return (
    <View style={[styles.header, {backgroundColor:theme.primary}]}>
      <Text
      style={styles.title}>Wordle</Text>
      <View style={{flexDirection: 'row', alignItems:'center', gap:13, opacity:0.9}}>

        <TouchableOpacity onPress={()=> {
          onStatPress()
          setStatVisible(true);
        }}>
          <Icon  name='leaderboard' size={30}  />
        </TouchableOpacity>
        
         <TouchableOpacity onPress={()=> {
          onIconPress()
          setStatVisible(true);
         }}>
           <Avatar img={avatar} width={32} borderWidth={2} color={'white'} isMain={true} />
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
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 18
  },
  title: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 22,
    
  }
})



