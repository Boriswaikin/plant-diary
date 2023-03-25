import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function DiaryItem({ item }) {
  const navigation = useNavigation();
  function diaryPressed(item) {
    navigation.navigate('Gallery', {item:item})
  }
  return (
    <Pressable onPress={()=>diaryPressed(item)}>
        <Text>[url][url][url][url]</Text>
        <Text>species: {item.species}</Text>
        <Text>date: {item.date}</Text>
        <Text>location: {item.location}</Text>
        <Text>likes: {item.likes}</Text>
    </Pressable>
  )
}