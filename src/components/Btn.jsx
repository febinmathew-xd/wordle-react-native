import { StyleSheet, Text, View , Button , TouchableOpacity} from 'react-native'
import React from 'react'


export default function Btn({title, navigation}) {
  return (
    <TouchableOpacity 
    onPress={()=> navigation.navigate("Home")}
    style={styles.btn}>
        <Text style={styles.title}>
          {title}
        </Text>
    </TouchableOpacity>

    
  )
  
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: "#2196f3",
        maxHeight: 60,
        borderRadius:20,
        flex:1,
        justifyContent:'center',
        alignItems: "center",
        width: '100%',
        paddingVertical:15
    },
    title:{
      fontSize:18,
      fontWeight: '700',
    


    }
})
