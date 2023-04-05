import { View, Text, Button, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from "expo-image-picker"
import PressableButton from './PressableButton';
import GallaryBox from './GallaryBox';

export default function ImageManager({ imageUriHandler,removedUri,resetRemovedUri}) {
    const [permissionInfo, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageURI, setImageURI] = useState([]);
    const [usedCamera,setUsedCamera]=useState(false);
  
    useEffect(()=>{setImageURI([])},[removedUri])

    async function verifyPermission() {
        if (permissionInfo.granted) {
            return true;
        }
    
        try {
            const result = await requestPermission();
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
        if (!result.canceled) {
            var uriArray = [];
            uriArray.push(result.assets[0].uri);
            setImageURI(uriArray);
            imageUriHandler(uriArray);
            setUsedCamera(true);
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
                const arr = result.assets.map(
                    item=>item.uri
                )
        if (!result.canceled) {
            setImageURI(arr);
            imageUriHandler(arr);
            setUsedCamera(false);
        }
         } catch (err) {
            console.log(err);
         }
    };

  return (
    <View>
       <PressableButton 
            buttonPressed={() => {
            Alert.alert(
            "Select Image",
            "",
            [
            { text: "Take Photo..." ,
            onPress: () => {
                resetRemovedUri();
                imageHandler();
              },
            },
            {
              text: "Choose from Library",
              onPress: () => {
                resetRemovedUri();
                imageFromLibraryHandler();
              },
            },
            {
                text: "Cancel",
                onPress: () => {
                },
              },
          ],
          { cancelable: false }
        );
      }}>
        <Text>More options</Text>
        </PressableButton>
      {/* <Button title="Take a Picture" onPress={imageHandler}></Button>
      <Button title="Get From Library" onPress={imageFromLibraryHandler}></Button> */}

      {usedCamera && imageURI[0] && <Image 
        source={{
            uri: imageURI[0]
            }} 
        style={{ width:100, height:100 }} />}
      {!usedCamera && imageURI[0] && <GallaryBox galleryItem={imageURI}/>}
    </View>

  )
};