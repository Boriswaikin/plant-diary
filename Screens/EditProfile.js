import { View, Text, Button, TextInput, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { editProfile } from '../Firebase/helper';
import Icon from '../components/Icon';
import PressableButton from '../components/PressableButton';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function EditProfile({ navigation, route }) {
  const [newname, setNewname] = useState(route.params.profile.name);
  const [favplant, setFavplant] = useState(route.params.profile.favouritePlant);
  const [head, setHead] = useState(route.params.profile.headPhoto);

  async function pressEditProfile() {
    try {
    await editProfile(route.params.profile.uid, {name:newname,favouritePlant:favplant, headPhoto:head});
    console.log("profile updated");
    navigation.navigate('Profile');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Icon width={100} height={100} borderRadius={100} source={route.params.profile.headPhoto} />
      <PressableButton customizedStyle={styles.editButton}>
        <Text style={styles.editText}>Edit Head Photo</Text>
      </PressableButton>
      <View style={styles.inputContainer}>
        <View style={styles.iconInput}>
          <MaterialIcons name="person" size={24} color="black" style={styles.icon} />
          <TextInput 
          style={styles.input}
          placeholder='User Name' 
          value={newname} 
          onChangeText={(changeText)=>{setNewname(changeText)}} 
          />
        </View>
        <View style={styles.iconInput}>
          <Entypo name="flower" size={24} color="black" style={styles.icon}/>
          <TextInput 
          style={styles.input}
          placeholder='Favorite Plant' 
          value={favplant} 
          onChangeText={(changeText)=>{setFavplant(changeText)}} 
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PressableButton customizedStyle={styles.button} buttonPressed={()=>navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </PressableButton>
        <PressableButton customizedStyle={styles.button} buttonPressed={()=>pressEditProfile()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </PressableButton>
      </View>
    </SafeAreaView>
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
    fontSize: 40,
    fontWeight: 800,
    width: 300,
    marginVertical: 30,
  },
  subtitle: {
    fontSize: 16,
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
    marginTop: 30,
  },
  input: {
    flex: 1,
    fontSize:18, 
    paddingVertical:14,
  },
  inputContainer: {
    width: 300,
    marginVertical: 20,
  },
  iconInput: {
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
  },
  editButton: {
    borderRadius: 5,
    padding: 2,
    margin: 10,
    width: 120,
    height: 22,
    backgroundColor: 'rgb(220,220,220)',
  },
  editText: {
    fontSize: 11,
    color: 'black',
    fontWeight: 600,
  },
})