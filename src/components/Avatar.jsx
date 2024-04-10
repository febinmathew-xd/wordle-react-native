import { StyleSheet, Image, View } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../screens/Home'

const Avatar = ({img, width, borderWidth, color, isMain=false}) => {
    const {avatar, theme} = useContext(AppContext);
    const selected = avatar.id === img.id
  return (
    <View style={[styles.imageContainer, {width:width, height:width, borderWidth:borderWidth, borderRadius: width/2}, {borderColor:color}, selected? {borderColor:theme.primary, borderWidth:3}:  null, isMain? {borderTopWidth:1,borderBottomWidth:1, borderLeftWidth:1, borderRightWidth:1, borderColor:color}:null]}>
       <Image source={img.source} style={styles.image} />
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
    image: {
        width:'100%',
        height: '100%',
        resizeMode:'cover'
        
    },
    imageContainer:{
        
        
        overflow : 'hidden',
        
      
    }
})