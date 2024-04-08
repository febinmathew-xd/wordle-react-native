import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileDetails = ({imgUrl, userName, dateJoined}) => {
  return (
    <View style={styles.displayPictureContainer} > 
    <View style={styles.imageContainer}>
       
    </View>
      
      <View style={styles.details}>
        <Text>
            @{userName}
        </Text>
        <Text>
            Joined: {dateJoined}
        </Text>
      </View>
    </View>
  )
}

export default ProfileDetails

const styles = StyleSheet.create({
    displayPictureContainer:{

    },
    details: {

    },
    image: {
        width:100,
        height:100
    },
    imageContainer:{
        
    }
})