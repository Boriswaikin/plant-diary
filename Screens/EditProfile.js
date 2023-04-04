import { View, Text, Button, TextInput, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { editProfile } from '../Firebase/helper';

export default function EditProfile({ navigation, route }) {
  const [newname, setNewname] = useState(route.params.profile.name);
  const [favplant, setFavplant] = useState(route.params.profile.favouritePlant);
  const [head, setHead] = useState(route.params.profile.headPhoto);

  async function pressEditProfile() {
    await editProfile(route.params.profile.id, {name:newname,favouritePlant:favplant, headPhoto:head});
    console.log("profile updated");
    navigation.navigate('Profile');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile Picture</Text>
      <Text>[head-url]</Text>
      <Button title='Edit Head'></Button>
      <Text>User Name</Text>
      <TextInput
      placeholder='New user name'
      value={newname}
      onChangeText={(text)=>setNewname(text)}
       />
      <Text>Favorite Plant</Text>
      <TextInput
      placeholder='Your favorite plant'
      value={favplant}
      onChangeText={(text)=>setFavplant(text)}
       />
      <View>
        <Button title='Cancel' onPress={()=>navigation.goBack()} />
        <Button title='Confirm' onPress={()=>pressEditProfile()} />
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
  }
})