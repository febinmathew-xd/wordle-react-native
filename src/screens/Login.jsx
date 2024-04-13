import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity,  ScrollView, StatusBar,} from 'react-native'
import React, { useContext, useState } from 'react'
import { InputField, Btn , Logo} from '../components'
import Axios from '../utils/api'
import { storeData } from '../utils/storage'
import { AuthContext } from '../routes/Routes'
import { defaultGame } from '../utils/utls'


const Login = ({navigation}) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [userNameError, setUserNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const {setIsAuthenticated, setUserData} = useContext(AuthContext);



  const handleCredentials = (value, type) =>{
    if (type === "PASSWORD"){
      setPassword(value);
    }
    if (type==="USERNAME"){
      setUserName(value);
    }
  }

  const onLoginPress =  ()=> {

    if(userName && password){
    setLoading(true);
    setPasswordError(false);
    setUserNameError(false);
    Axios.post('login/', {username:userName.toLowerCase(), password:password}).then((response)=>{
      if(response.data ){
        storeData('userData', response.data).then(()=>{
          console.log("userData saved successfully")
          setUserData(response.data)
          
          
        
        }).catch((err)=>console.log(err))

        storeData('gameData', defaultGame).then(()=>{
          setIsAuthenticated(true)
        }).catch((error)=>console.log(error))
        
      }
    }).catch((error)=>{
      
      if(error){
        console.log("error~", error)
      }
      if(error.response && error.response.data && error.response.data.error){
        console.log("error reponse data", error.response.data)
        const errorMessage = error.response.data.error
        if (errorMessage.includes('username')){
          setUserNameError(true)
        }else if (errorMessage.includes('password')){
          setPasswordError(true)
        }
        
      }
      
      
      
      
    }).finally(()=>setLoading(false))
  }

  };






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
        error={userNameError}
        placeholder={'Username'}
        type={"USERNAME"}
        onTextChange={handleCredentials}

        />

        <InputField 
        error={passwordError}
        placeholder={'Password'}
        type={"PASSWORD"}
        password={true}
        onTextChange={handleCredentials}
        />  

        <Btn loading={loading} onButtonPress={onLoginPress} title='Login'/>

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