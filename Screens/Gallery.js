import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Gallery({ navigation, route }) {
  return (
    <View>
        <Text>author:</Text>
        <Button title={route.params.item.author}  onPress={()=>navigation.navigate('Profile')} />
        <Text>[url][url][url][url]</Text>
        <Text>species: {route.params.item.species}</Text>
        <Text>date: {route.params.item.date}</Text>
        <Text>location: {route.params.item.location}</Text>
        <Text>likes: {route.params.item.likes}</Text>
    </View>
  )
}