import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Start({navigation}) {
  return (
    <View>
      <Text>Plant Diary</Text>
      <Text>Share a beautiful journey of your favourite plant!</Text>
      <Button title='Login' onPress={()=>navigation.navigate('Login')} />
      <Button title='Signup' onPress={()=>navigation.navigate('Signup')} />
    </View>
  )
}