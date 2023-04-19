import { View, Text, TextInput, SafeAreaView, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { editProfile } from '../Firebase/helper';
import Icon from '../components/Icon';
import PressableButton from '../components/PressableButton';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../Firebase/firebase-setup';

export default function EditProfile({ navigation, route }) {
  const [newname, setNewname] = useState(route.params.profile.name);
  const [favplant, setFavplant] = useState(route.params.profile.favouritePlant);
  const [head, setHead] = useState(route.params.profile.headPhoto);
  const [newhead, setNewhead] = useState(null);
  const [permissionInfo, requestPermission] = ImagePicker.useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);

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

  async function fetchImage(uri) {
    try {
    const response = await fetch(uri);
    const imageBlob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf('/') + 1);
    const imageRef = await ref(storage, `images/${imageName}`)
    const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
    return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log(err);
    }
  }

  function pressEditHead() {
    Alert.alert(
      "Select Image",
      "",
      [
      { text: "Take Photo..." ,
      onPress: () => {
          imageHandler();
        },
      },
      {
        text: "Choose from Library",
        onPress: () => {
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
    }

  async function imageHandler() {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
          Alert.alert("You need to give access to camera.");
          return;
      }
      try {
      const result = await ImagePicker.launchCameraAsync({allowsEditing: true, quality:0.5, maxWidth: 200, maxHeight: 200,})
      if (!result.canceled) {
        setNewhead(result.assets[0].uri);
        setHead(result.assets[0].uri);
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
    const result = await ImagePicker.launchImageLibraryAsync({quality:0.5, maxWidth: 200, maxHeight: 200,})
    if (!result.canceled) {
      setNewhead(result.assets[0].uri);
      setHead(result.assets[0].uri);
    }
     } catch (err) {
        console.log(err);
     }
  };

  async function pressEditProfile() {
    try {
      // if (newhead) {
      //   setHead(await fetchImage(newhead));
      // }
      setIsLoading(true);
      await editProfile(route.params.profile.uid, {name:newname,favouritePlant:favplant, headPhoto:newhead?await fetchImage(newhead):head});
      console.log("profile updated");
      setNewhead(null);
      setIsLoading(false);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Icon size={100} source={head} />
      <PressableButton customizedStyle={styles.editButton} buttonPressed={()=>pressEditHead()}>
        <Text style={styles.editText}>Edit Head Photo</Text>
      </PressableButton>
      <View style={styles.inputContainer}>
        <View style={styles.iconInput}>
          <MaterialIcons name="person" size={24} color="black" style={styles.icon} />
          <TextInput 
          style={styles.input}
          placeholder='User Name' 
          value={newname} 
          autoCapitalize="none"
          onChangeText={(changeText)=>{setNewname(changeText)}} 
          />
        </View>
        <View style={styles.iconInput}>
          <Entypo name="flower" size={24} color="black" style={styles.icon}/>
          <TextInput 
          style={styles.input}
          placeholder='Favorite Plant' 
          value={favplant} 
          autoCapitalize="none"
          onChangeText={(changeText)=>{setFavplant(changeText)}} 
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PressableButton customizedStyle={styles.button} buttonPressed={()=>navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </PressableButton>
        <PressableButton customizedStyle={styles.button} buttonPressed={()=>pressEditProfile()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </PressableButton>
      </View>
      {isLoading && <View style={styles.indicator}>
          <ActivityIndicator size="small" color="black" />
        </View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 800,
    width: 300,
    marginVertical: 30,
  },
  subtitle: {
    fontSize: 16,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    width: 300,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    marginTop: 30,
  },
  input: {
    flex: 1,
    fontSize:18, 
    paddingVertical:14,
  },
  inputContainer: {
    width: 300,
    marginVertical: 20,
  },
  iconInput: {
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
  },
  editButton: {
    borderRadius: 5,
    padding: 2,
    margin: 10,
    width: 120,
    height: 22,
    backgroundColor: 'rgb(220,220,220)',
  },
  editText: {
    fontSize: 11,
    color: 'black',
    fontWeight: 600,
  },
  indicator: {
    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
})