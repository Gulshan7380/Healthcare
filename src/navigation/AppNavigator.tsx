import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { HomeTabs } from './HomeTabs';
import { authService } from '../services/AuthService';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 500,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 500,
            },
          },
        },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-layouts.screen.height, 0],
                  }),
                },
              ],
              opacity: current.progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.5, 1],
              }),
            },
          };
        },
      }}
    >
      <Stack.Screen name="Splash">
        {({ navigation }) => (
          <SplashScreen
            onFinish={() => navigation.replace(isLoggedIn ? 'Home' : 'Login')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Login">
        {({ navigation }) => (
          <LoginScreen
            onLogin={() => navigation.replace('Home')}
            onNavigateToSignup={() => navigation.navigate('Signup')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Signup">
        {({ navigation }) => (
          <SignupScreen
            onNavigateToLogin={() => navigation.navigate('Login')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Home" component={HomeTabs} />
    </Stack.Navigator>
  );
};
