import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Avatar from './Avatar'
import { AppContext } from '../screens/Home'

const ProfileDetails = ({img, userName, dateJoined}) => {
  const {theme} = useContext(AppContext)
  return (
    <View style={styles.displayPictureContainer} > 
     <Avatar 
     img={img} 
     width={50}
     borderWidth={3}
     color={theme.primary}
      />
      
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
      flexDirection: 'row',
      marginTop: 50,
      alignItems: 'center'    
    },
    details: {
      paddingLeft: 10

    },
    
})