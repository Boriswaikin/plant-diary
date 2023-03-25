import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Create from './Create';
import TopTab from './TopTab';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="TopTab" component={TopTab} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}