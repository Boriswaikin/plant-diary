import { View, Text, Button, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker"

export default function ImageManager({ imageUriHandler }) {
    const [permissionInfo, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageURI, setImageURI] = useState([]);

    async function verifyPermission() {
        // console.log(permissionInfo);
        if (permissionInfo.granted) {
            return true;
        }
    
        try {
            const result = await requestPermission();
            console.log(result)
            return result.granted;
        } catch (err) {
            console.log(err);
        }
    }

    async function imageHandler() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            Alert.alert("You need to give access to camera.");
            return;
        }
        try {
        const result = await ImagePicker.launchCameraAsync({allowsEditing: true})
        // console.log(result.assets);
        if (!result.canceled) {
            // console.log(result.assets[0].uri);
            setImageURI(result.assets[0].uri);
            imageUriHandler(result.assets[0].uri);
            // console.log(imageURI);
        }
         } catch (err) {
            console.log(err);
         }
    };

    async function imageFromLibraryHandler() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            Alert.alert("You need to give access to camera.");
            return;
        }
        try {
        const result = await ImagePicker.launchImageLibraryAsync(
            {
                // allowsEditing: true,
                allowsMultipleSelection:true})
                // console.log(result.assets);
                const arr = result.assets.map(
                    item=>{
                        return item.uri;
                    }
                )
                // console.log(arr[0]);
        if (!result.canceled) {
            // console.log(result.assets[0].uri);
            setImageURI(arr);
            imageUriHandler(arr);
        }
         } catch (err) {
            console.log(err);
         }
    };

  return (
    <View>
      <Button title="Take a Picture" onPress={imageHandler}></Button>
      <Button title="Get From Library" onPress={imageFromLibraryHandler}></Button>
      { imageURI && <Image 
        source={{
            uri: imageURI[0]
            }} 
        style={{ width:100, height:100 }} />}
    </View>
  )
}