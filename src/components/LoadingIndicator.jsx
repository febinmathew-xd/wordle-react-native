import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../App';

const LoadingIndicator = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <View
      style={[styles.loadingContainer, {backgroundColor: theme.background}]}>
      <StatusBar backgroundColor={theme.background} />

      <ActivityIndicator size={'large'} color={theme.primary} />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
