import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React, { useContext } from 'react'

import { AppContext } from '../screens/Home'

const ToggleNavigation = ({onPressProfile, onPressSettings, isProfile, isSettings}) => {
  const {theme} = useContext(AppContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{onPressProfile()}} style={[styles.bar, {borderColor:theme.primary}, isProfile? {backgroundColor:theme.primary}:null]}>
        <Text style={[styles.text, {color:theme.primary},isProfile? styles.selectedText:null]}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{onPressSettings()}} style={[styles.bar, {borderColor:theme.primary}, isSettings? {backgroundColor:theme.primary}:null]}>
        <Text style={[styles.text, {color:theme.primary}, isSettings? styles.selectedText:null]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ToggleNavigation

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20
  },
  bar :{
    borderWidth: 1,
    
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 3
  },
  
  text: {
    
    fontSize: 14,
    fontWeight: '700'
  
  },
  selectedText: {
    color: 'white'
  }

})