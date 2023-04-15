import { View, Text,TextInput, FlatList, StyleSheet, Alert, SafeAreaView,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDiary, deleteDiary, editDiary, getProfileById } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { ref, uploadBytesResumable,deleteObject } from "firebase/storage";
import ImageManager from '../components/ImageManager';
import { storage } from '../Firebase/firebase-setup';
import GallaryBox from '../components/GallaryBox';
import PressableButton from '../components/PressableButton';
import LocationManager from '../components/LocationManager';
import StorageImage from '../components/StorageImage';
import NotificationManager from '../components/NotificationManager';
import DropDownPicker from 'react-native-dropdown-picker';


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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
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
  ]);

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
        species: species.trim(),
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
    NotificationManager();
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
        {/* {edit?<Text style={styles.heavyFont}>{species}</Text>
        : */}
         {/* <TextInput style = {styles.textInput} placeholder='Select species' value={species} onChangeText={setSpecies} /> */}
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={()=>{
          setSpecies(value);}}
      />
        {/* } */}
        <Text style={styles.subtitle}>Location</Text>
        {edit?<Text style={styles.lightFont}>Locate @ <Text style={styles.heavyFont}>{location[1]}</Text></Text>

        :<LocationManager locationHandler={setLocation} screenName={"Create"} setLoadingLocation={setLoadingLocation}/>}

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {isLoading && <ActivityIndicator size="small" color="red" />}
        </View>
      </View>
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