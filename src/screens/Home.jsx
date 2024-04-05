import { 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  view, 
  Modal, 
  View, 
  TouchableOpacity } from 'react-native'

import { 
  Board, 
  Header, 
  Keyboard, 
  ProfileDetails, 
  Statistics, 
  ToggleNavigation } from '../components'

import React, { useState } from 'react'
import Colors from '../utils/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'



const Home = () => {
  const [statVisible, setStatVisible] = useState(false);
  return (
    <>
    <StatusBar backgroundColor={'#2196f3'}/>
    <SafeAreaView style={styles.container}>
        <Header setStatVisible={setStatVisible}/>
        <Board/>
        <Keyboard/>
    
    <Modal
    visible={statVisible}
    onRequestClose={()=> setStatVisible(false)}
    transparent={true}
    animationType='slide'>

    <View style={styles.modalContainer}>
      <View style={styles.box}> 
      <View style={{position:'absolute', right:0, top:0}}>

        <TouchableOpacity style={{padding:10}} onPress={()=>setStatVisible(false)}>
            <Icon name='cancel' size={30} color={Colors.blue.primary} />
        </TouchableOpacity>
        
      </View>

      </View>

    </View>
    </Modal>
        
          
        
        
    </SafeAreaView>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        
        
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000814'
        
        
         
    },
    box:{
      backgroundColor: Colors.blue.background,
      width: '100%',
      height: 450,
      borderWidth: 0.5,
      borderColor: Colors.blue.primary,
      borderRadius:10,
      elevation: 10
    },
    modalContainer: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
      paddingHorizontal: 20
    }

   
    
})