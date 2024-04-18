import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const RevailAnswer = ({text}) => {
  return (
    <View style={[styles.container, {backgroundColor: '#04e762'}]}>
      <Text style={[styles.text]}>Correct Word : {text.toUpperCase()}</Text>
    </View>
  );
};

export default RevailAnswer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -2,
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
