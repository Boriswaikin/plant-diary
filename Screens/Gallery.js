import { View, Text, Button } from 'react-native';
import React from 'react';
import GalleryBox from '../components/GallaryBox';
import PressableButton from '../components/PressableButton';
import { auth } from '../Firebase/firebase-setup';

export default function Gallery({ navigation, route }) {
  return (
    <View>
        <Text>author:</Text>
        {route.params.item.userId === auth.currentUser.uid ?
        <PressableButton buttonPressed={()=>navigation.navigate('Profile')}> 
          <Text>{route.params.item.userName}</Text> 
        </PressableButton> :
        <PressableButton buttonPressed={()=>navigation.navigate('Third Profile', {id:route.params.item.userId, name:route.params.item.userName})}> 
          <Text>{route.params.item.userName}</Text> 
        </PressableButton>
        }
        <Text>[url][url][url][url]</Text>
        <GalleryBox />
        <Text>species: {route.params.item.species}</Text>
        <Text>location: {route.params.item.location}</Text>
        <Text>story: {route.params.item.story}</Text>
        <Text>date: {route.params.item.date}</Text>
        <Text>like: {route.params.item.like}</Text>
    </View>
  )
}