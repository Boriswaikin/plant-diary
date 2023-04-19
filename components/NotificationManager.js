import { View, Text, PushNotificationIOS, Alert } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications';


export async function verifyPermission() {
    const permissionResponse = await Notifications.getPermissionsAsync();
    if (permissionResponse.granted){
        return true;
    }
    try {
        const permissionResult = await Notifications.requestPermissionsAsync();
        return permissionResult.granted;
    }
    catch (err){
        console.log("Error on Permission Request ");
    }
}

export default function NotificationManager(title,body){
    async function scheduleNotificationHandler(){
        const hasPermission = verifyPermission();
        if (!hasPermission){
            Alert.alert("You need a permission");
            return;
        }
        try {
            await Notifications.scheduleNotificationAsync(
                {content:
                    {title:title,
                    body:body
                ,data:{url:"http://google.com"},categoryIdentifier: "welcome",},trigger:null}
            )
        }
        catch (err){
            console.log(err);
        }
    }
    scheduleNotificationHandler();
}
