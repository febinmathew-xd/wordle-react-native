import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeBox from './ThemeBox'
import { colorTheme } from '../utils/Colors'
import { AppContext } from '../screens/Home'
import { avatarList } from '../utils/utls'
import Avatar from './Avatar'
import { AuthContext } from '../routes/Routes'
import { clearAllData, storeData } from '../utils/storage'
import { ThemeContext } from '../App'

const Settings = () => {
    const { setAvatar} = useContext(AppContext)
    const {setIsAuthenticated, setUserData} = useContext(AuthContext)
    const {theme} = useContext(ThemeContext);

    const onLogoutPress = () =>{
      
      clearAllData().then(()=>{
        
        setIsAuthenticated(false)
      }).catch((error)=>{
        console.log(error)
      })


    }




  return (
    <View>
      <Text style={{color:theme.primary, fontSize:16, fontWeight:'700', marginLeft:10, paddingVertical:15}}>Themes</Text>
      <ScrollView horizontal={true}>
        {colorTheme.map((theme)=>(<ThemeBox key={theme.id} obj={theme} />))}

      </ScrollView>
      
      <Text style={{color:theme.primary, fontSize:16, fontWeight:'700', marginLeft:10, paddingVertical:15}}>Avatar</Text>
       <ScrollView horizontal={true}>
        
        {avatarList.map((avatar)=>(
            <TouchableOpacity onPress={()=> {
              setAvatar(avatar)
              storeData('avatar', avatar).then(()=>{}).catch((error)=>console.log(error))

              }}  
              
              style={{padding:4}} key={avatar.id} >
                    <Avatar  img={avatar} width={59} borderWidth={2} color={'white'} />
            </TouchableOpacity>
        ))}
         
       </ScrollView>
       <View style={styles.logoutContainer}>
       <TouchableOpacity onPress={onLogoutPress} style={styles.logoutButton}>
        <Text style={{fontWeight:'bold'}}>Logout</Text>
       </TouchableOpacity>
       </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  logoutContainer:{
    
    height:70,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  logoutButton:{
    backgroundColor: '#9d0208',
    paddingHorizontal: 30,
    paddingVertical:5,
    borderRadius:10
    
  }
})