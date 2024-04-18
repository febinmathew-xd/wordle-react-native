import {StyleSheet, Text, Vibration, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Letter from './Letter';
import {ThemeContext} from '../App';
import RevailAnswer from './RevailAnswer';
import {AppContext} from '../screens/Home';

const Board = () => {
  const {theme} = useContext(ThemeContext);
  const {gameOver, correctWord} = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  setTimeout(() => {
    const isVisible = gameOver.gameover && !gameOver.guessedWord;

    setVisible(isVisible);
  }, 4600);

  return (
    <View style={[styles.board, {backgroundColor: theme.background}]}>
      <View style={{flexDirection: 'row', gap: 5}}>
        <Letter letterPos={0} attemptVal={0} />
        <Letter letterPos={1} attemptVal={0} />
        <Letter letterPos={2} attemptVal={0} />
        <Letter letterPos={3} attemptVal={0} />
        <Letter letterPos={4} attemptVal={0} />
      </View>

      <View style={{flexDirection: 'row', gap: 5}}>
        <Letter letterPos={0} attemptVal={1} />
        <Letter letterPos={1} attemptVal={1} />
        <Letter letterPos={2} attemptVal={1} />
        <Letter letterPos={3} attemptVal={1} />
        <Letter letterPos={4} attemptVal={1} />
      </View>

      <View style={{flexDirection: 'row', gap: 5}}>
        <Letter letterPos={0} attemptVal={2} />
        <Letter letterPos={1} attemptVal={2} />
        <Letter letterPos={2} attemptVal={2} />
        <Letter letterPos={3} attemptVal={2} />
        <Letter letterPos={4} attemptVal={2} />
      </View>

      <View style={{flexDirection: 'row', gap: 5}}>
        <Letter letterPos={0} attemptVal={3} />
        <Letter letterPos={1} attemptVal={3} />
        <Letter letterPos={2} attemptVal={3} />
        <Letter letterPos={3} attemptVal={3} />
        <Letter letterPos={4} attemptVal={3} />
      </View>

      <View style={{flexDirection: 'row', gap: 5}}>
        <Letter letterPos={0} attemptVal={4} />
        <Letter letterPos={1} attemptVal={4} />
        <Letter letterPos={2} attemptVal={4} />
        <Letter letterPos={3} attemptVal={4} />
        <Letter letterPos={4} attemptVal={4} />
      </View>

      <View style={{flexDirection: 'row', gap: 5}}>
        <Letter letterPos={0} attemptVal={5} />
        <Letter letterPos={1} attemptVal={5} />
        <Letter letterPos={2} attemptVal={5} />
        <Letter letterPos={3} attemptVal={5} />
        <Letter letterPos={4} attemptVal={5} />
      </View>
      {visible && <RevailAnswer text={correctWord} />}
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  board: {
    width: '100%',
    height: 380,
    padding: 15,
    gap: 5,
    alignItems: 'center',
  },
});
