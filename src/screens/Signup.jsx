import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView} from 'react-native'
import React, { useContext, useState } from 'react'
import { InputField, Btn , Logo} from '../components'
import Axios from '../utils/api'
import { storeData } from '../utils/storage'
import { AuthContext } from '../routes/Routes'
import { defaultGame } from '../utils/utls'

const Signup = ({navigation}) => {

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const {setIsAuthenticated, setUserData} = useContext(AuthContext)

  const handleCredentials = (value, type) =>{
    if (type==="USERNAME"){
      setUserName(value)
    }
    if (type==="PASSWORD"){
      setPassword(value)
    }
    if (type==="EMAIL"){
      setEmail(value)
    }
  };

  const handleSignupPress = ()=>{
    if(userName && password && email){
      setLoading(true)
      Axios.post('user/', {username:userName.toLowerCase(), password:password, email:email.toLowerCase()}).then((response)=>{
        console.log(response.data)
        if(response.data){
          storeData("userData", response.data).then(()=>{
            setUserData(response.data)
            
          }).catch((error)=> {
            console.log("signup page storing data error", error)
          })


          storeData("gameData", defaultGame).then(()=>{
            setIsAuthenticated(true)
          }).catch((error)=>console.log(error))



        }

      }).catch((error)=>{
        console.log(error?.response)
      }).finally(()=>{
        setLoading(false)
      })


    }

  }






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
        placeholder={'Enter an email'}
        type={"EMAIL"}
        onTextChange={handleCredentials}
        />

        <InputField 
        placeholder={'Enter a username'}
        type={"USERNAME"}
        onTextChange={handleCredentials}
        />  

        <InputField 
        placeholder={'Enter a password '}
        password={true}
        type={"PASSWORD"}
        onTextChange={handleCredentials}
        />  

        <Btn loading={loading} onButtonPress={handleSignupPress}  title='Signup'/>

        
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