import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import BigKey from './BigKey';
import Key from './Key';
import {AppContext} from '../screens/Home';

const Keyboard = () => {
  const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const {disabledKey, greenKey, yellowKey} = useContext(AppContext);

  return (
    <View style={styles.keyboard}>
      <View style={styles.line1}>
        {keys1.map(key => {
          return (
            <Key
              key={key}
              keyVal={key}
              disabled={disabledKey.includes(key)}
              green={greenKey.includes(key)}
              yellow={yellowKey.includes(key)}
            />
          );
        })}
      </View>
      <View style={styles.line1}>
        {keys2.map(key => {
          return (
            <Key
              keyVal={key}
              key={key}
              disabled={disabledKey.includes(key)}
              green={greenKey.includes(key)}
              yellow={yellowKey.includes(key)}
            />
          );
        })}
      </View>
      <View style={styles.line1}>
        <BigKey keyVal={'enter'} />
        {keys3.map(key => {
          return (
            <Key
              keyVal={key}
              key={key}
              disabled={disabledKey.includes(key)}
              green={greenKey.includes(key)}
              yellow={yellowKey.includes(key)}
            />
          );
        })}
        <BigKey keyVal={'delete'} />
      </View>
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({
  keyboard: {
    width: '100%',
    backgroundColor: '#000814',
    gap: 10,
    paddingBottom: 30,
  },
  line1: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'center',
  },
});
