import { View, Text, Button, TextInput, FlatList,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDiary, deleteDiary, editDiary, getDiaryById, getProfileByUid } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';

export default function Create({ navigation, route }) {
  const [photos, setPhotos] = useState(['url1','url2']);
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [story, setStory] = useState("");
  const [date, setDate] = useState([]);
  const [edit, setEdit] = useState(false);

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

  async function pressCreateDiary() {
    // createDiary(photos, species, location, story);
    console.log("A diary created");
    try {
      const userProfile = await getProfileByUid(auth.currentUser.uid);
      const userName = userProfile.name;
      await createDiary({		
        photos: photos,
        description: story,
        species: species,
        location: location,
        userName: userName,
        date: [Date.now()]});
    } catch (err) {
      console.log(err);
    }
    cleanup();
    navigation.goBack();
  }

  function cleanup() {
    setPhotos(['url1', 'url2']);
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
        photos: photos,
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
        <FlatList 
        data={photos}
        renderItem={({item})=>{
          return (
            <Text>{item}</Text>
          )
        }}
        />
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
          : <Button title='Create' onPress={()=>pressCreateDiary()} />
        }
        
        
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  textInput:{height:40}
})