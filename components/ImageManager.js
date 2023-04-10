import { View, Image, Alert,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from "expo-image-picker"
import PressableButton from './PressableButton';
import { Feather } from '@expo/vector-icons';


export default function ImageManager({ imageUriHandler,removedUri,resetRemovedUri,setPhotoNew}) {
    const [permissionInfo, requestPermission] = ImagePicker.useCameraPermissions();
    const [libraryPermissionInfo, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();
    const [imageURI, setImageURI] = useState([]);
    // const [edit, setEdit]=useState(false);

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

    async function verifyLibraryPermission() {
      if (libraryPermissionInfo.granted) {
          return true;
      }
  
      try {
          const result = await requestLibraryPermission();
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
        const hasPermission = await verifyLibraryPermission();
        if (!hasPermission) {
            Alert.alert("You need to give access to media library.");
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

  function toggleRemove(filteredItem){
    setImageURI((prev)=>prev.filter(item=>item!==filteredItem));
    imageUriHandler((prev)=>prev.filter(item=>item!==filteredItem));
  }


  return (
    <View style={{flexDirection:'row',flexWrap:"wrap"}}>
      {imageURI &&      
         imageURI.map((item) => {
            return <View key={item} style={{paddingTop:2,paddingRight:8}}>
              <Image 
                // resizeMode='cover'
                style={{width:80,height:80}}
                source={{uri:item}}/>
                <PressableButton
                buttonPressed={
                  ()=>{
                    toggleRemove(item);}
                }>
                <Feather name="minus-circle" size={20} color="lightgray" style={styles.topLeft} />
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
          style={{width:60,height:60}}
          source={require('../images/add.png')}/>
        </PressableButton>
    </View>

  )
};

const styles=StyleSheet.create({
  topLeft: {
    position: 'relative',
    bottom: 80,
    left: 31,
  },
}
)