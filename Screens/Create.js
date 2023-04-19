import { View, Text, ScrollView, TextInput, FlatList, StyleSheet, Alert, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDiary, deleteDiary, editDiary, getProfileById } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { ref, uploadBytesResumable,deleteObject } from "firebase/storage";
import ImageManager from '../components/ImageManager';
import { storage } from '../Firebase/firebase-setup';
import PressableButton from '../components/PressableButton';
import LocationManager from '../components/LocationManager';
import StorageImage from '../components/StorageImage';
import APIManager from '../components/APIManager';
import DropdownList from '../components/DropdownList';
import NotificationManager from '../components/NotificationManager';


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
  const [scroll, setScroll] = useState(true);
  const [value, setValue] = useState("");
  const items = [
    {label: 'African Violet', value: 'African Violet'},
    {label: 'Air Plant', value: 'Air Plant'},
    {label: 'Alocasia', value: 'Alocasia'},
    {label: 'Aloe Vera', value: 'Aloe Vera'},
    {label: 'Anthurium', value: 'Anthurium'},
    {label: 'Asparagus Fern', value: 'Asparagus Fern'},
    {label: 'Begonia', value: 'Begonia'},
    {label: 'Bromeliad', value: 'Bromeliad'},
    {label: 'Cactus', value: 'Cactus'},
    {label: 'Calathea', value: 'Calathea'},
    {label: 'Chinese Evergreen', value: 'Chinese Evergreen'},
    {label: 'Chinese Money Plant', value: 'Chinese Money Plant'},
    {label: 'Coleus', value: 'Coleus'},
    {label: 'Croton', value: 'Croton'},
    {label: 'Dieffenbachia', value: 'Dieffenbachia'},
    {label: 'Dracaena', value: 'Dracaena'},
    {label: 'English Ivy', value: 'English Ivy'},
    {label: 'Fiddle Leaf Fig', value: 'Fiddle Leaf Fig'},
    {label: 'Fittonia', value: 'Fittonia'},
    {label: 'Geranium', value: 'Geranium'},
    {label: 'Guiana Chestnut', value: 'Guiana Chestnut'},
    {label: 'Haworthia', value: 'Haworthia'},
    {label: 'Jade Plant', value: 'Jade Plant'},
    {label: 'Jew', value: 'Jew'},
    {label: 'Kalanchoe', value: 'Kalanchoe'},
    {label: 'Lavender', value: 'Lavender'},
    {label: 'Maranta Prayer Plant', value: 'Maranta Prayer Plant'},
    {label: 'Monstera', value: 'Monstera'},
    {label: 'Palm', value: 'Palm'},
    {label: 'Peace Lily', value: 'Peace Lily'},
    {label: 'Peperomia', value: 'Peperomia'},
    {label: 'Philodendron', value: 'Philodendron'},
    {label: 'Pothos', value: 'Pothos'},
    {label: 'Rubber Plant', value: 'Rubber Plant'},
    {label: 'Schefflera', value: 'Schefflera'},
    {label: 'Snake Plant', value: 'Snake Plant'},
    {label: 'Spider Plant', value: 'Spider Plant'},
    {label: 'String of Pearls', value: 'String of Pearls'},
    {label: 'Swiss Cheese Plant', value: 'Swiss Cheese Plant'},
    {label: 'Yucca', value: 'Yucca'},
    {label: 'ZZ Plant', value: 'ZZ Plant'},
    {label: 'Others', value: 'Others'},
  ];

  function resetRemovedUri(){
    setRemovedUri(false); 
  }

  function setPhotoNew(text){
    setNewPhoto(text);
  }

  function setLoadingLocation(status){
    setIsLoading(status)
  } 

  useEffect(()=>{
    if (route.params  && route.params.diary) {
      setEdit(true);
      const currentDiary = route.params.diary;
      console.log(currentDiary.species);
      setPhotos(currentDiary.photos);
      setPreviousPhoto(currentDiary.photos);
      setLocation(currentDiary.location);
      setStory(currentDiary.description);
      setSpecies(currentDiary.species);
      setDate(currentDiary.date);
      setValue(currentDiary.species);
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
    NotificationManager(
      "Diary created!"
      ,"Congratulation! Your diary is created and published. Keep publishing more diaries to record your plant growth."
    );
    navigation.navigate("Home");
  }

  function cleanup() {
    // setPhotos(['url1', 'url2']);
    setPhotos([]);
    setLocation([]);
    setDate([]);
    setStory("");
    setValue("");
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
      location.length===0
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
      {edit?<View style={styles.inputContainer}>
        {photos&&  
        <View>
        <Text style={styles.subtitle}>Previous Photos</Text>
        <FlatList 
          data={photos}
          horizontal={true}
          contentContainerStyle={{gap:5,marginTop:2}}
          renderItem={({item})=>{
            return (
              <StorageImage source={item} size={90} />
            )
          }}
        />
        </View>
        }
      <ScrollView style={styles.inputContainer}>
        <Text style={styles.subtitle}>Add Photos</Text>
        <ImageManager imageUriHandler={(uri)=>
          imageUriHandler(uri)} removedUri={removedUri} resetRemovedUri={resetRemovedUri} setPhotoNew={setPhotoNew}/>
        <Text style={styles.subtitle}>Species</Text>
        <Text style={styles.heavyFont}>{species}</Text>
        <Text style={styles.subtitle}>Story</Text>
        <TextInput style = {styles.textInput} placeholder='Tell us your story' value={story} autoCapitalize="none" onChangeText={setStory} />
        <Text style={styles.subtitle}>Location</Text>
        <Text style={styles.lightFont}>Locate @ <Text style={styles.heavyFont}>{location[1]}</Text></Text>
      </ScrollView>
      </View>
      :
      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Add Photos</Text>
        <ImageManager imageUriHandler={(uri)=>
          imageUriHandler(uri)} removedUri={removedUri} resetRemovedUri={resetRemovedUri} setPhotoNew={setPhotoNew}/>
        <Text style={styles.subtitle}>Species</Text>
        <View  style={styles.speciesContainer}>
          <View style={styles.speciesLine}>
            <DropdownList options={items} onSelect={setSpecies}/>
            <View style={styles.speciesInput}>
              <Text style={styles.heavyFont}>{species}</Text>
            </View>
          </View>
          {photos.length!==0&&<APIManager uri={photos[photos.length - 1]} setLoading={setIsLoading} setOutput={setSpecies} />}
        </View>
        <ScrollView style={styles.inputContainer} scrollEnabled={scroll}>
          <Text style={styles.subtitle}>Story</Text>
          <TextInput style = {styles.textInput} placeholder='Tell us your story' value={story} autoCapitalize="none" onChangeText={setStory} />
          <Text style={styles.subtitle}>Location</Text>
          <LocationManager locationHandler={setLocation} screenName={"Create"} setLoadingLocation={setLoadingLocation}/>
        </ScrollView>
      </View>
      }
      <View style={styles.buttonContainer}>
        {edit ? 
            <PressableButton
            customizedStyle={styles.button}
            buttonPressed={() => {
              Alert.alert(
                "Important",
                "Are you sure you want to delete the selected diary?",
                [
                  { text: "No" },
                  {
                    text: "Yes",
                    onPress: () => {
                      pressDeleteDiary();
                    },
                  },
                ],
                { cancelable: false }
              );
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
            }
          }>
          <Text style={styles.buttonText}>Create</Text>
          </PressableButton>}
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
    marginHorizontal: 30,
    marginVertical: 10,
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
    width: 120,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 15,
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
  },
  speciesContainer: {
    zIndex: 10,
    elevation: (Platform.OS === 'android') ? 10 : 0,
  },
  speciesLine: {
    flexDirection: 'row',
    gap: 20,
    zIndex: 11,
    elevation: (Platform.OS === 'android') ? 11 : 0,
  },
  speciesInput: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 8,
    height: 40,
    padding: 4,
    fontSize: 15,
    flex: 1,
  },
  indicator: {
    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
})