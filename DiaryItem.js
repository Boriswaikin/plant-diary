import { View, Text } from 'react-native'
import React from 'react'

export default function DiaryItem({ item }) {
  return (
    <View>
        <Text>[url][url][url][url]</Text>
        <Text>species: {item.species}</Text>
        <Text>date: {item.date}</Text>
        <Text>location: {item.location}</Text>
        <Text>likes: {item.likes}</Text>
    </View>
  )
}