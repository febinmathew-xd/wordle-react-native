import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../App';

const Message = ({message}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={[styles.container, {backgroundColor: theme.primary}]}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: 'white',
          opacity: 0.8,
        }}>
        {message}
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 130,

    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
