import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Start from './Screens/Start';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Gallery from './Screens/Gallery';
import Profile from './Screens/Profile';
import EditProfile from './Screens/EditProfile';
import BottomTab from './Screens/BottomTab';
import { SafeAreaView, StatusBar } from 'react-native';
import FollowTab from './Screens/FollowTab';
import { auth } from './Firebase/firebase-setup';
import { onAuthStateChanged } from 'firebase/auth';
import Create from './Screens/Create';
import Map from './Screens/Map';
import * as Notifications from 'expo-notifications'
import { Linking } from 'react-native';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification:async()=>{
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,}
    }
  }
)


export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      onAuthStateChanged(auth, (user)=>{
          if (user) {
              setIsAuthenticated(true);
          } else {
              setIsAuthenticated(false);
          }
      });
  },[]);


  useEffect(()=>{
    const subscription1 =Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("notification received :", notification);
      });

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      response => {
        const url = response.notification.request.content.data.url;
        Linking.openURL(url);
      })
    return () => {
      subscription1.remove();
      subscription2.remove();}
  
  },[]);

  const AuthStack = (
    <>
    <Stack.Screen name="Start" component={Start} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    </>
  )

  const AppStack = (
    <>
    <Stack.Screen name="Plant Diary" component={BottomTab} />
    <Stack.Screen name="Gallery" component={Gallery} />
    <Stack.Screen name="Follow" component={FollowTab} options={{headerShown: true}}/>
    <Stack.Screen name="Edit Profile" component={EditProfile} options={{headerShown: true}}/>
    <Stack.Screen name="Third Profile" component={Profile} options={{headerShown: true}}/>
    <Stack.Screen name="Edit Diary" component={Create} options={{headerShown: true}}/>
    <Stack.Screen name="Map" component={Map}/>
    </>
  )

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
    <NavigationContainer>
        {/* <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"pink"}, headerTitleStyle:{color:"purple", fontSize: 18}, headerTitleAlign:"center"}}> */}
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {isAuthenticated ? AppStack : AuthStack}
        </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
