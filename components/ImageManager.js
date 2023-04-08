import { View, Image, Alert,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from "expo-image-picker"
import PressableButton from './PressableButton';
import { Feather } from '@expo/vector-icons';


export default function ImageManager({ imageUriHandler,removedUri,resetRemovedUri,setPhotoNew}) {
    const [permissionInfo, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageURI, setImageURI] = useState([]);
    const [edit, setEdit]=useState(false);

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
            var arr = [];
            arr.push(result.assets[0].uri);
            setImageURI((prev)=>[...prev,...arr]);
            imageUriHandler((prev)=>[...prev,...arr]);
            setPhotoNew(arr);
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
            setImageURI((prev)=>[...prev,...arr]);
            imageUriHandler((prev)=>[...prev,...arr]);
            setPhotoNew(arr);
        }
         } catch (err) {
            console.log(err);
         }
    };

  return (
    <View style={{flexDirection:'row',flexWrap:"wrap"}}>
      {imageURI &&      
         imageURI.map((item) => {
            return <View key={item} style={{flexDirection:'row',flexWrap:"wrap",paddingTop:5, paddingLeft:5,paddingRight:5}}>
              <PressableButton>
                <View></View>
              <Image style={{width:90,height:90}}
                source={{uri:item}}/>
                <Feather name="minus-circle" size={24} color="white" style={styles.topLeft} />
                </PressableButton>
                </View>;
          })}
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
        <Image 
          style={{width:80,height:80}}
          source={require('../images/add.png')}/>
        </PressableButton>
    </View>

  )
};

const styles=StyleSheet.create({
  topRight: {
    // position: 'relative',
    // top: 8,
    // // right: 12,
  },
}
)