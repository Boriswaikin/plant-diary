import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { editProfile } from '../Firebase/helper';

export default function EditProfile({ navigation, route }) {
  const [newname, setNewname] = useState(route.params.profile.name);
  const [favplant, setFavplant] = useState("");

  async function pressEditProfile() {
    await editProfile(route.params.profile.id, {name:newname,favplant:favplant});
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