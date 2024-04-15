import { StyleSheet, Text, Modal , TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../screens/Home'
import { ProfileDetails, ToggleNavigation,Statistics, Chart, Settings } from '.'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getData } from '../utils/storage'
import { AuthContext } from '../routes/Routes'

const ProfileModal = ({visible, setVisible }) => {
    const {theme, avatar, profileView, settingsView, handleProfle, handleSettings} = useContext(AppContext);
    const {userData} = useContext(AuthContext);
   

   




  return (
    <Modal
    visible={visible}
    onRequestClose={()=> setVisible(false)}
    transparent={true}
    animationType='slide'>

    <View style={styles.modalContainer}>
      <View style={[styles.box, {backgroundColor:theme.background, borderColor:theme.primary}]}> 
      <View style={{position:'absolute', right:0, top:0}}>

        <TouchableOpacity style={{padding:10}} onPress={()=>setVisible(false)}>
            <Icon name='cancel' size={30} color={theme.primary} />
        </TouchableOpacity>
        
      </View>
      <ProfileDetails img={avatar} userName={userData.username} dateJoined={userData.date_joined} email={userData.email} />
      <ToggleNavigation isProfile={profileView} isSettings={settingsView} onPressProfile={handleProfle} onPressSettings={handleSettings}/>
     {profileView && <View>
      <Statistics/>
      <Chart/>
      </View>}
      {settingsView && <Settings/> }
      

      </View>

    </View>
    </Modal>
        
  )
}

export default ProfileModal

const styles = StyleSheet.create({
    box:{
     
        width: '100%',
        height: 470,
        borderWidth: 0.5,
       
        borderRadius:10,
        elevation: 10,
        paddingHorizontal:16
      },
      modalContainer: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: 20
      }
})
        