import { View, Text, PushNotificationIOS, Alert } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications';


export async function verifyPermission() {
    const permissionResponse = await Notifications.getPermissionsAsync();
    if (permissionResponse.granted){
        return true;
    }
    try {
        const permissionResult = await Notifications.requestPermissionAsync();
        return permissionResult.granted;
    }
    catch (err){
        console.log("Error on Permission Request ");
    }
}

export default function NotificationManager(){
    async function scheduleNotificationHandler(){
        const hasPermission = verifyPermission();
        if (!hasPermission){
            Alert.alert("You need a permission");
            return;
        }
        try {
            await Notifications.scheduleNotificationAsync(
                {content:
                    {title:"Diary created!",
                    body:"Congratulation! Your diary is published. Keep publishing more diaries to record your plant growth."
                ,data:{url:"http://google.com"}},trigger:null}
            )
        }
        catch (err){
            console.log(err);
        }
    }
    scheduleNotificationHandler();
}
