import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { InputField, Btn , Logo} from '../components'

const Signup = ({navigation}) => {

  const [userName, setUserName] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const handleCredentials = (value, type) =>{
    if (type==="USERNAME"){
      setUserName(value)
    }
    if (type==="PASSWORD1"){
      setPassword1(value)
    }
    if (type==="PASSWORD2"){
      setPassword2(value)
    }
  }


  console.log(userName)
  console.log(password1)
  console.log(password2)



  return (
    <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor='#000814' />
        <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
          <View style={{flex:1, alignItems:'center',opacity:.8 }} >
            <Logo/>
            <Text style ={styles.title}>
                 Create a wordle account
            </Text>
          </View>
        <View style={styles.form}>
        
        

        <InputField 
        placeholder={'Enter a username'}
        type={"USERNAME"}
        onTextChange={handleCredentials}
        />

        <InputField 
        placeholder={'Enter a password'}
        password={true}
        type={"PASSWORD1"}
        onTextChange={handleCredentials}
        />  

        <InputField 
        placeholder={'Enter password again'}
        password={true}
        type={"PASSWORD2"}
        onTextChange={handleCredentials}
        />  

        <Btn navigation={navigation}  title='Signup'/>

        
        <View style={styles.horizontalLine}>

        </View>

        <TouchableOpacity 
          style={styles.createAccount}
          onPress={()=> navigation.navigate("Login")}
          >
          <Text style={{fontSize:17, color: '#2196f3', fontWeight:500}}>
            Login to existing account
          </Text>
        </TouchableOpacity>

    
        </View>
        </ScrollView>
        
        
    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({
    container:{
        
        padding:20,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
        backgroundColor: '#000814'
        
        
         
    },
    form:{
        
        flex:1,
        gap:15,
        width:'100%',
        alignItems: 'center'
        
        
        
    },
    horizontalLine:{
      height:1,
      backgroundColor: '#2196f3',
      marginVertical: 10,
      width: '100%'
    },
    passwordReset: {
      flex:1,
      alignItems:'center',
      justifyContent: 'center',
      maxHeight:30,
      
    },

    passText:{
      fontSize:16,
      
    },

    createAccount: {
      width: '100%',
      textAlign: 'center',
      borderColor: '#2196f3',
      borderWidth:2,
      flex:1,
      maxHeight:60,
      alignItems:'center',
      justifyContent: 'center',
      borderRadius: 20,
      color: '#2196f3',
      paddingVertical:15
    },
    title:{
      fontFamily: 'Pacifico-Regular',
      fontSize: 22,
      marginBottom: 30,
      paddingTop:5,
      fontWeight: '500',
      
    }
})