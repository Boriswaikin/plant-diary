import { View, Text, Button, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Create({ navigation, editItem }) {
  const [photos, setPhotos] = useState(['url1','url2']);
  const [species, setSpecies] = useState();
  const [location, setLocation] = useState();
  const [story, setStory] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(()=>{
    if (editItem) {
      setEdit(true);
      setPhotos(editItem.photos);
      setLocations(editItem.location);
      setStory(editItem.story);
      setSpecies(editItem.species);
    }
  },[])

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
          <Button title='Delete' onPress={()=>deleteDiary(editItem.id)} /> 
          : <Button title='Cancel' onPress={()=>navigation.goBack()} />
        }
        {edit ? 
          <Button title='Confirm' onPress={()=>updateDiary(editItem.id, photos, species, location, story)} /> 
          : <Button title='Create' onPress={()=>createDiary(photos, species, location, story)} />
        }
        
        
      </View>
    </View>
  )
}