import { View, Text, Button } from 'react-native';
import React from 'react';
import GalleryBox from '../components/GallaryBox';
import PressableButton from '../components/PressableButton';

export default function Gallery({ navigation, route }) {
  return (
    <View>
        <Text>author:</Text>
        <PressableButton buttonPressed={()=>navigation.navigate('Third Profile')}> 
          <Text>{route.params.item.author}</Text> 
        </PressableButton>
        <Text>[url][url][url][url]</Text>
        <GalleryBox />
        <Text>species: {route.params.item.species}</Text>
        <Text>location: {route.params.item.location}</Text>
        <Text>story: {route.params.item.story}</Text>
        <Text>date: {route.params.item.date}</Text>
        <Text>likes: {route.params.item.likes}</Text>
    </View>
  )
}