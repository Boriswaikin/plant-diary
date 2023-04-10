import { View, Text, Button, TextInput, FlatList, StyleSheet, Alert, SafeAreaView,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDiary, deleteDiary, editDiary, getDiaryById, getProfileById } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { ref, uploadBytesResumable,deleteObject } from "firebase/storage";
import ImageManager from '../components/ImageManager';
import { storage } from '../Firebase/firebase-setup';
import GallaryBox from '../components/GallaryBox';
import PressableButton from '../components/PressableButton';
import Color from '../components/Color';
import { async } from '@firebase/util';
import LocationManager from '../components/LocationManager';
import StorageImage from '../components/StorageImage';



export default function Create({ navigation, route }) {
  const [photos,setPhotos]= useState([]);
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState([]);
  const [story, setStory] = useState("");
  const [date, setDate] = useState([]);
  const [edit, setEdit] = useState(false);
  const [removedUri, setRemovedUri] = useState(false);
  const imageUriHandler=(uri)=>setPhotos(uri);
  const [previousPhoto,setPreviousPhoto]=useState([]);
  const [newPhoto, setNewPhoto]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

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
        setIsLoading(true);
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
        species: species.trim().toLowerCase(),
        location: location,
        geohash: location[0],
        userName: userName,
        date: [Date.now()]});
    } catch (err) {
      console.log(err);
    }
    cleanup();
    setRemovedUri(true);
    setIsLoading(false);
    navigation.navigate("Home");
  }

  function cleanup() {
    // setPhotos(['url1', 'url2']);
    setPhotos([]);
    setSpecies("");
    setLocation([]);
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
        setIsLoading(true);
        imageUri = uri.map((item)=>{
          return fetchImage(item);
      })
      newImage= await Promise.all(imageUri);
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
    setIsLoading(false);
    navigation.navigate('Plant Diary', {
      screen: 'Home'})
  }

  async function deletePhoto(uri){
    try{
      const photoRef = ref(storage,uri);
      await deleteObject(photoRef);
    }
    catch (err){
      console.log("delete image error");
    }
  }
  

  async function pressDeleteDiary() {

    const photoAll = route.params.diary.photos;
    console.log(photoAll);
    try{
      setIsLoading(true);
    await photoAll.forEach((item)=>{
      deletePhoto(item)});}
    catch (err)
      {console.log("delete all image error")}
    // deleteDiary(route.params.diaryId);
    console.log("A diary deleted");
    try {
      await deleteDiary(route.params.diary.diaryId);
    } catch (err) {
      console.log(err);
    }
    cleanup();
    setIsLoading(false);
    navigation.goBack();
  }



    
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        {edit&&photos&&  
        <View>
        <Text style={styles.subtitle}>Previous Photos</Text>
        <FlatList 
          data={photos}
          numColumns={4}
          ItemSeparatorComponent={() => <View style={{height: 5}} />}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({item})=>{
            return (
              <StorageImage source={item} size={90} />
            )
          }}
        />
        </View>
        }
        <Text style={styles.subtitle}>Add Photos</Text>
        {edit ? (route.params.uri&& <GallaryBox galleryItem={route.params.uri}/>):<></>}
        <ImageManager imageUriHandler={(uri)=>
          imageUriHandler(uri)} removedUri={removedUri} resetRemovedUri={resetRemovedUri} setPhotoNew={setPhotoNew}/>
        <Text style={styles.subtitle}>Story</Text>
        <TextInput style = {styles.textInput} placeholder='Tell us your story' value={story} onChangeText={setStory} />
        <Text style={styles.subtitle}>Species</Text>
        {edit?<Text style={styles.heavyFont}>{species}</Text>
        :<TextInput style = {styles.textInput} placeholder='Select species' value={species} onChangeText={setSpecies} />}
        <Text style={styles.subtitle}>Location</Text>
        {edit?<Text style={styles.lightFont}>Locate @ <Text style={styles.heavyFont}>{location[1]}</Text></Text>
        :<LocationManager locationHandler={setLocation} screenName={"Create"}/>}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {isLoading && <ActivityIndicator size="small" color="red" />}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {edit ? 
            <PressableButton
            customizedStyle={styles.button}
            buttonPressed={() => {
              pressDeleteDiary();
            }}>
            <Text style={styles.buttonText}>Delete</Text>
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
            <Text style={styles.buttonText}>Cancel</Text>
            </PressableButton>} 
         {edit ? 
             <PressableButton
             customizedStyle={styles.button}
             buttonPressed={() => {
              const status =createValidate();
              if (status){
               pressUpdateDiary(newPhoto);
              }
             }}>
             <Text style={styles.buttonText}>Confirm</Text>
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
          <Text style={styles.buttonText}>Create</Text>
          </PressableButton>}
        </View>
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    marginTop: 10,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 20,
    marginBottom: 5,
  },
  inputContainer: {
    flex: 1,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    marginTop: 30,
    width: 120,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    // alignSelf: 'center',
    justifyContent: "center",
    flexDirection: "row",
  },
  editButton: {
    borderRadius: 5,
    padding: 2,
    width: 80,
    height: 22,
    backgroundColor: 'rgb(220,220,220)',
  },
  editText: {
    fontSize: 11,
    color: 'black',
    fontWeight: 600,
  },
  lightFont: {
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: 400,
    color: 'rgb(100,100,100)',
    margin: 5,
  },
  heavyFont: {
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: 600,
    color: 'rgb(50,50,50)',
    margin: 5,
  },
  textInput: {
    marginTop: 5,
    height: 40,
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 4,
  },
  columnWrapper: {
    gap: 5,
  }
})