import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Theme } from './src/constants/theme';
import { AppNavigator } from './src/navigation/AppNavigator';

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Theme.colors.white}
          translucent={false}
        />
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
