import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity,  ScrollView, StatusBar} from 'react-native'
import React from 'react'
import { InputField, Btn , Logo} from '../components'

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor='#000814' />
        <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
          <View style={{flex:1, alignItems:'center',opacity:.8 }} >
            <Logo/>
            <Text style ={styles.title}>
                 Wordle!
            </Text>
          </View>
        <View style={styles.form}>
        
        <InputField 
        placeholder={'Email or username'}
        password={false}
        />

        <InputField 
        placeholder={'Password'}
        password={true}
        />  

        <Btn navigation={navigation} title='Login'/>

        <TouchableOpacity style={styles.passwordReset}>
          <Text style={styles.passText}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine}>

        </View>

        <TouchableOpacity 
        style={styles.createAccount}
        onPress={()=> navigation.navigate("Signup")}
        >
          <Text style={{fontSize:17, color: '#2196f3', fontWeight:500}}>
            Create an account
          </Text>
        </TouchableOpacity>

    
        </View>
        </ScrollView>
        
        
    </SafeAreaView>
  )
}

export default Login

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
        gap:20,
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
      
      
      
    }
})