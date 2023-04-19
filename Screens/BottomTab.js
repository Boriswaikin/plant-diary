import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Create from './Create';
import TopTab from './TopTab';
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={({ route })=> ({headerShown: false,
      tabBarShowLabel: false,
      tabBarIcon: ({ color, focused }) => {
        var iconName;
        if (route.name === "Home") {
          iconName = focused ? "home-sharp" : "home-outline";
        }
        if (route.name === "Create") {
          // iconName = focused ? "add-circle-sharp" : "add-circle-outline";
          iconName = focused ? "flower-sharp" : "flower-outline";
        }
        if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        }
        return <Ionicons name={iconName} size={24} color={color} />;
      },})}>
      <Tab.Screen name="Home" component={TopTab} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}