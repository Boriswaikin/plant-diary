import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Start from './Screens/Start';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import Gallery from './Screens/Gallery';
import Profile from './Screens/Profile';
import Create from './Screens/Create';
import Follow from './Screens/Follow';
import EditProfile from './Screens/EditProfile';


const Stack = createNativeStackNavigator();

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const AuthStack = (
    <>
    <Stack.Screen name="Start" component={Start} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />

    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Gallery" component={Gallery} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Create" component={Create} />
    <Stack.Screen name="Follow" component={Follow} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    </>
  )

  const AppStack = (
    <>

    </>
  )

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"pink"}, headerTitleStyle:{color:"purple", fontSize: 18}, headerTitleAlign:"center"}}>
            {isAuthenticated ? AppStack : AuthStack}
        </Stack.Navigator>
    </NavigationContainer>
  );
}
