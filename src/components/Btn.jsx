import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

export default function Btn({title, onButtonPress, loading = false}) {
  return (
    <TouchableOpacity onPress={() => onButtonPress()} style={styles.btn}>
      {loading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#2196f3',
    height: 53,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});
