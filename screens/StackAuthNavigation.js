import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './AuthScreen';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

const StackAuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === 'ios'
              ? 'white'
              : Colors.accent,
        },
        headerTintColor:
          Platform.OS === 'ios'
            ? Colors.accent
            : 'white',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: '700',
        },
        headerTitleAlign: 'left',
      }}
    >
      <Stack.Screen
        name='Auth'
        component={AuthScreen}
        options={{ title: 'Login/SignUp' }}
      />
    </Stack.Navigator>
  );
};

export default StackAuthNavigation;
