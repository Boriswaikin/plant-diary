import { View, Text, Button, TextInput, FlatList, StyleSheet, Alert, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDiary, deleteDiary, editDiary, getDiaryById, getProfileById } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { ref, uploadBytesResumable } from "firebase/storage";
import ImageManager from '../components/ImageManager';
import { storage } from '../Firebase/firebase-setup';
import GallaryBox from '../components/GallaryBox';
import PressableButton from '../components/PressableButton';
import Color from '../components/Color';
import { async } from '@firebase/util';
import LocationManager from '../components/LocationManager';


export default function Create({ navigation, route }) {
  const [photos,setPhotos]= useState([]);
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState(null);
  const [story, setStory] = useState("");
  const [date, setDate] = useState([]);
  const [edit, setEdit] = useState(false);
  const [removedUri, setRemovedUri] = useState(false);
  const imageUriHandler=(uri)=>setPhotos(uri);
  const [previousPhoto,setPreviousPhoto]=useState([]);
  const [newPhoto, setNewPhoto]=useState([]);

  function resetRemovedUri(){
    setRemovedUri(false); 
  }

  function setPhotoNew(text){
    setNewPhoto(text);
  }

  useEffect(()=>{
    if (route.params  && route.params.diary) {
      setEdit(true);
      const currentDiary = route.params.diary;
      setPhotos(currentDiary.photos);
      setPreviousPhoto(currentDiary.photos);
      setLocation(currentDiary.location);
      setStory(currentDiary.description);
      setSpecies(currentDiary.species);
      setDate(currentDiary.date);
    }
  },[])

  async function fetchImage(uri){
    
    try{
      const response = await fetch(uri);
      const imageBlob = await response.blob(); //image data
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = await ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
      return uploadResult.metadata.fullPath; //path to the image on the storage
    }
    catch (err){
      console.log("image fetch error",err);
    }
  }

  async function pressCreateDiary(uri) {

    let imageUri = [];
    let imageAll = [];
    if(uri)
      try {
        imageUri = uri.map((item)=>{
          return fetchImage(item);
      })
      imageAll= await Promise.all(imageUri);
      }
      catch (err){
        console.log("image fetch error",err);
      }
    // createDiary(photos, species, location, story);
    console.log("A diary created");
    try {
      const userProfile = await getProfileById(auth.currentUser.uid);
      const userName = userProfile.name;
      await createDiary({		
        photos:imageAll,
        description: story,
        species: species,
        location: location,
        userName: userName,
        date: [Date.now()]});
    } catch (err) {
      console.log(err);
    }
    cleanup();
    navigation.navigate("Home");
  }

  function cleanup() {
    // setPhotos(['url1', 'url2']);
    setPhotos([]);
    setSpecies("");
    setLocation(null);
    setDate([]);
    setStory("");
  }

  function createValidate(){
    if (
      photos.length===0
    ) {
      Alert.alert("Kindly upload at least one picture to record the journey");
      return false;
    }
    else if(
      !species.trim()
    )
    { Alert.alert("Kindly provide the species of the plant");
    return false;
    }
    else if(
      !location
    )
    { Alert.alert("Kindly provide the location of the plant");
    return false;
    }
    else if(
      !story.trim()
    )
    { Alert.alert("Kindly provide the stories of the plant");
    return false;
    }
    return true;
  }

  async function pressUpdateDiary(uri) {
    // updateDiary(route.params.diaryId, photos, species, location, story);
    let imageUri = [];
    let newImage = [];
    if(uri)
      try {
        imageUri = uri.map((item)=>{
          return fetchImage(item);
      })
      newImage= await Promise.all(imageUri);
      c
      }
      catch (err){
        console.log("image fetch error",err);
      }
    console.log("A diary updated");
    const combineImage= [...previousPhoto,...newImage];
    try {
      await editDiary(route.params.diary.diaryId, {		
        photos:combineImage,
        description: story,
        species: species,
        location: location,
        date: [Date.now(),...date]});
    } catch (err) {
      console.log(err);
    }
    cleanup();
  }

  async function pressDeleteDiary() {
    // deleteDiary(route.params.diaryId);
    console.log("A diary deleted");
    try {
      await deleteDiary(route.params.diary.diaryId);
    } catch (err) {
      console.log(err);
    }
    cleanup();
    navigation.goBack();
  }


    
  return (
    <SafeAreaView>
      <View>
        <Text>Add Photos</Text>
        {edit ? (route.params.uri&& <GallaryBox galleryItem={route.params.uri}/>):<></>}
        <ImageManager imageUriHandler={(uri)=>
          imageUriHandler(uri)} removedUri={removedUri} resetRemovedUri={resetRemovedUri} setPhotoNew={setPhotoNew}/>
        {/* <FlatList 
        data={photos}
        renderItem={({item})=>{
          return (
            <Text>{item}</Text>
          )
        }}
        /> */}
        {/* <Button title='+' onPress={showActionSheet}/> */}
      
     
        <Text>Species</Text>
        {edit?<Text>{species}</Text>
        :<TextInput style = {styles.textInput} placeholder='Select species' value={species} onChangeText={setSpecies} />}
        <Text>Location</Text>
        {edit?<Text>{location[1]}</Text>
        :<LocationManager locationHandler={setLocation}/>}
        <Text>Story</Text>
        <TextInput style = {styles.textInput} placeholder='Tell us your story' value={story} onChangeText={setStory} />
      </View>
      <View style={styles.fixToText}>
      <View style={styles.viewButton}>
        {edit ? 
            <PressableButton
            customizedStyle={styles.button}
            buttonPressed={() => {
              pressDeleteDiary();
            }}>
            <Text style={{ color: Color.headerTintColor }}>Delete</Text>
            </PressableButton>
          : 
            <PressableButton
            customizedStyle={styles.button}
            buttonPressed={() => {
              navigation.navigate('Plant Diary', {
                screen: 'Home'})
                cleanup();
                setRemovedUri(true);
            }}>
            <Text style={{ color: Color.headerTintColor,fontSize:16 }}>Cancel</Text>
            </PressableButton>} 
          </View>
          <View style={styles.viewButton}>
         {edit ? 
             <PressableButton
             customizedStyle={styles.button}
             buttonPressed={() => {
              navigation.navigate('Plant Diary', {
                screen: 'Home'})
              const status =createValidate();
              if (status){
               pressUpdateDiary(newPhoto);
              }
             }}>
             <Text style={{ color: Color.headerTintColor }}>Confirm</Text>
             </PressableButton>  
          : 
          
          <PressableButton
          customizedStyle={styles.button}
          buttonPressed={() => {
            const status =createValidate();
            if (status){
            pressCreateDiary(photos);
            }
          }}>
          <Text style={{ color: Color.headerTintColor ,fontSize:16,textAlign:"center"}}>Create</Text>
          </PressableButton>}
          </View> 
        </View>
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  textInput:{height:40},
  fixToText: {
    marginLeft: 100,
    marginRight: 100,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button:{
    width:"100%",height:"100%",justifyContent:'center'
  },
  viewButton:{
    width:80,height:40,padding:5,borderRadius:6,backgroundColor:"gray"

  }

})