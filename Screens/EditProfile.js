import { View, Text, Button, TextInput } from 'react-native'
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
    <View>
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
    </View>
  )
}