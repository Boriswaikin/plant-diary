import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'

export default function Start({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Plant Diary</Text>
      <Text>Share a beautiful journey of your favourite plant!</Text>
      <Button title='Login' onPress={()=>navigation.navigate('Login')} />
      <Button title='Signup' onPress={()=>navigation.navigate('Signup')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
  },
})