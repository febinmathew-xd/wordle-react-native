import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeBox from './ThemeBox'
import { colorTheme } from '../utils/Colors'
import { AppContext } from '../screens/Home'
import { avatarList } from '../utils/utls'
import Avatar from './Avatar'

const Settings = () => {
    const {theme, setAvatar} = useContext(AppContext)
  return (
    <View>
      <Text style={{color:theme.primary, fontSize:16, fontWeight:'700', marginLeft:10, paddingVertical:15}}>Themes</Text>
      <ScrollView horizontal={true}>
        {colorTheme.map((theme)=>(<ThemeBox key={theme.id} obj={theme} />))}

      </ScrollView>
      
      <Text style={{color:theme.primary, fontSize:16, fontWeight:'700', marginLeft:10, paddingVertical:15}}>Avatar</Text>
       <ScrollView horizontal={true}>
        
        {avatarList.map((avatar)=>(
            <TouchableOpacity onPress={()=> {setAvatar(avatar)}}  style={{padding:4}} key={avatar.id} >
                    <Avatar  img={avatar} width={59} borderWidth={2} color={'white'} />
            </TouchableOpacity>
        ))}
         
       </ScrollView>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})