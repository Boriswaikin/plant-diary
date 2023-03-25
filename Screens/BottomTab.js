import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import Create from './Create';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}