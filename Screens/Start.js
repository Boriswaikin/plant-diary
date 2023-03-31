import { View, Text, Button, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'
import PressableButton from '../components/PressableButton';

export default function Start({navigation}) {
  return (
    <ImageBackground source={{uri:'https://e0.pxfuel.com/wallpapers/912/830/desktop-wallpaper-plant-aesthetic-plain-monstera-iphone.jpg'}} resizeMode="cover" style={styles.container}>
      <Text style={styles.title}>Plant Diary</Text>
      <Text style={styles.slogan}>Share a beautiful journey of your favourite plant!</Text>
      <View style={styles.buttonContainer}>
        <PressableButton customizedStyle={styles.button} buttonPressed={()=>navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </PressableButton>
        <PressableButton customizedStyle={styles.button} buttonPressed={()=>navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Signup</Text>
        </PressableButton>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 100,
    fontSize: 48,
    fontWeight: 800,
  },
  slogan: {
    width: 250,
    textAlign: 'center'
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    width: 300,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    marginTop: 100,
  }
})