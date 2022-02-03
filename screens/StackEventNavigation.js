import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import EventScreen from './EventScreen';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import AllEventScreen from './AllEventScreen';
import FavScreen from './FavScreen';
import ViewComp from '../components/ViewComp';

const Stack = createNativeStackNavigator();

const StackEventNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === 'ios'
              ? 'white'
              : Colors.heading,
        },
        headerTintColor:
          Platform.OS === 'ios'
            ? Colors.heading
            : 'white',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: '700',
        },
        headerTitleAlign: 'left',
      }}
    >
      <Stack.Screen
        name='Main'
        component={MainScreen}
      />
      <Stack.Screen
        name='Event'
        component={EventScreen}
        options={({ route }) => ({
          title: route.params.eventTitle,
        })}
      />
      <Stack.Screen
        name='AllEvent'
        component={AllEventScreen}
        options={({ route }) => ({
          title: route.params.eventTitle,
        })}
      />
      <Stack.Screen
        name='Fav'
        component={FavScreen}
      />
      <Stack.Screen
      name='Web'
      component={ViewComp}
      />
    </Stack.Navigator>
  );
};

export default StackEventNavigation;
