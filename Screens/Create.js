import { View, Text, Button, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Create({ navigation, route }) {
  const [photos, setPhotos] = useState(['url1','url2']);
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [story, setStory] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(()=>{
    if (route.params  && route.params.diaryId) {
      setEdit(true);
      const currentDiary = getDiary(route.params.diaryId);
      setPhotos(currentDiary.photos);
      setLocations(currentDiary.location);
      setStory(currentDiary.story);
      setSpecies(currentDiary.species);
    }
  },[])

  function pressCreateDiary() {
    // createDiary(photos, species, location, story);
    console.log("A diary created");
    navigation.goBack();
  }

  function pressUpdateDiary() {
    // updateDiary(route.params.diaryId, photos, species, location, story);
    console.log("A diary updated");
    navigation.goBack();
  }

  function pressDeleteDiary() {
    // deleteDiary(route.params.diaryId);
    console.log("A diary deleted");
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
        <TextInput placeholder='Select species' value={species} onChangeText={setSpecies} />
        <Text>Location</Text>
        <TextInput placeholder='Detecting location' value={location} onChangeText={setLocation} />
        <Text>Story</Text>
        <TextInput placeholder='Tell us your story' value={story} onChangeText={setStory} />
      </View>
      <View>
        {edit ? 
          <Button title='Delete' onPress={()=>pressDeleteDiary(editItem.id)} /> 
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