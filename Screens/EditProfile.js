import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function EditProfile({ navigation }) {
  const [newname, setNewname] = useState("");
  const [favplant, setFavplant] = useState("");

  function pressEditProfile() {
    console.log("profile updated");
    navigation.goBack();
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