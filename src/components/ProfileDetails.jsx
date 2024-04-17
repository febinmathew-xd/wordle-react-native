import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Avatar from './Avatar';
import {ThemeContext} from '../App';

const ProfileDetails = ({img, userName, dateJoined, email}) => {
  const date = new Date(dateJoined);
  date.setHours(date.getHours() + 5);
  date.setMinutes(date.getMinutes() + 30);
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  const formattedDate = date.toLocaleDateString('en-IN', options);

  const {theme} = useContext(ThemeContext);
  return (
    <View style={styles.displayPictureContainer}>
      <Avatar img={img} width={50} borderWidth={3} color={theme.primary} />

      <View style={styles.details}>
        <Text>@{userName}</Text>
        <Text>Email: {email}</Text>
        <Text>Joined: {formattedDate}</Text>
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  displayPictureContainer: {
    flexDirection: 'row',
    marginTop: 50,
    alignItems: 'center',
  },
  details: {
    paddingLeft: 10,
  },
});
