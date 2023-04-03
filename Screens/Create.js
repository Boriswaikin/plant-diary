import { View, Text, Button, TextInput, FlatList,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDiary, deleteDiary, editDiary, getDiaryById, getProfileByUid } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { ref, uploadBytesResumable } from "firebase/storage";
import ImageManager from '../components/ImageManager';
import { storage } from '../Firebase/firebase-setup';

export default function Create({ navigation, route }) {
  // const [photos, setPhotos] = useState(['url1','url2']);
  const [photosUri,setPhotosUri]= useState([]);
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [story, setStory] = useState("");
  const [date, setDate] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(()=>{
    if (route.params  && route.params.diary) {
      setEdit(true);
      const currentDiary = route.params.diary;
      setPhotosUri(currentDiary.photos);
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

    let imageUri = "";
    let imageAll = [];
    // console.log(uri);
    if(uri)
      try {
        imageUri = uri.map((item)=>{
          return  fetchImage(item);
      })
      imageAll= await Promise.all(imageUri);
      }
      catch (err){
        console.log("image fetch error",err);
      }
    // console.log(imageAll);
    // createDiary(photos, species, location, story);
    console.log("A diary created");
    try {
      const userProfile = await getProfileByUid(auth.currentUser.uid);
      const userName = userProfile.name;
      await createDiary({		
        // photos: photos,
        photosUri:imageAll,
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
    setPhotosUri([]);
    setSpecies("");
    setLocation("");
    setDate("");
    setStory("");
  }

  async function pressUpdateDiary() {
    // updateDiary(route.params.diaryId, photos, species, location, story);
    console.log("A diary updated");

    try {
      await editDiary(route.params.diary.diaryId, {		
        // photos: photos,
        photosUri:photosUri,
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


  const imageUriHandler=(uri)=>{
    setPhotosUri(uri);
    console.log(uri);
    }
    
  return (
    <View>
      <View>
        <Text>Add Photos</Text>
        <ImageManager imageUriHandler={(uri)=>
          imageUriHandler(uri)}/>
        {/* <FlatList 
        data={photos}
        renderItem={({item})=>{
          return (
            <Text>{item}</Text>
          )
        }}
        /> */}
        <Button title='+' />
        <Text>Species</Text>
        <TextInput style = {style.textInput} placeholder='Select species' value={species} onChangeText={setSpecies} />
        <Text>Location</Text>
        <TextInput style = {style.textInput} placeholder='Detecting location' value={location} onChangeText={setLocation} />
        <Text>Story</Text>
        <TextInput style = {style.textInput} placeholder='Tell us your story' value={story} onChangeText={setStory} />
      </View>
      <View>
        {edit ? 
          <Button title='Delete' onPress={()=>pressDeleteDiary()} /> 
          : <Button title='Cancel' onPress={()=>navigation.goBack()} />
        }
        {edit ? 
          <Button title='Confirm' onPress={()=>pressUpdateDiary()} /> 
          : <Button title='Create' onPress={()=>{
            pressCreateDiary(photosUri);
     
           }} />
        }
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  textInput:{height:40}
})