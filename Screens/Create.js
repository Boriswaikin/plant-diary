import { View, Text, Button, TextInput, FlatList,StyleSheet,Alert} from 'react-native'
import React, { useEffect, useState,useRef} from 'react'
import { createDiary, deleteDiary, editDiary, getDiaryById, getProfileByUid } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { ref, uploadBytesResumable } from "firebase/storage";
import ImageManager from '../components/ImageManager';
import { storage } from '../Firebase/firebase-setup';
import GallaryBox from '../components/GallaryBox';
import PressableButton from '../components/PressableButton';
import Color from '../components/Color';


export default function Create({ navigation, route }) {
  const [photos,setPhotos]= useState([]);
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [story, setStory] = useState("");
  const [date, setDate] = useState([]);
  const [edit, setEdit] = useState(false);
  const [removedUri, setRemovedUri] = useState(false);
  const imageUriHandler=(uri)=>setPhotos(uri);

  function resetRemovedUri(){

    setRemovedUri(false); 
  }

  useEffect(()=>{
    if (route.params  && route.params.diary) {
      setEdit(true);
      const currentDiary = route.params.diary;
      setPhotos(currentDiary.photos);
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
      const userProfile = await getProfileByUid(auth.currentUser.uid);
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
    naviagate(imageAll);
  }

  function naviagate(uri){
    navigation.navigate('Plant Diary', {
      screen: 'Home',
      params: {
        screen: 'Recommend',
        params: {
          imageUri: uri,
        },
        },
      },)
  }

  function cleanup() {
    // setPhotos(['url1', 'url2']);
    setPhotos([]);
    setSpecies("");
    setLocation("");
    setDate("");
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
      !location.trim()
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

  async function pressUpdateDiary() {
    // updateDiary(route.params.diaryId, photos, species, location, story);
    console.log("A diary updated");

    try {
      await editDiary(route.params.diary.diaryId, {		
        photos:photos,
        description: story,
        species: species,
        location: location,
        date: [Date.now(),...date]});
    } catch (err) {
      console.log(err);
    }
    cleanup();
    navigation.goBack();
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
    <View>
      <View>
        <Text>Add Photos</Text>
        {edit ? (route.params.uri&& <GallaryBox galleryItem={route.params.uri}/>):<></>}
        <ImageManager imageUriHandler={(uri)=>
          imageUriHandler(uri)} removedUri={removedUri} resetRemovedUri={resetRemovedUri}/>
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
        <TextInput style = {styles.textInput} placeholder='Select species' value={species} onChangeText={setSpecies} />
        <Text>Location</Text>
        <TextInput style = {styles.textInput} placeholder='Detecting location' value={location} onChangeText={setLocation} />
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
               pressUpdateDiary();
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
      </View>
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