import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  function loginHandler() {
    navigation.replace('Login');
  }
  function signupHandler() {
    if (password !== confirmpassword) {
      Alert.alert("Passwords are not matched");
    } else {
      navigation.navigate("Home");
    } 
  };

  return (
    <View>
      <Text>Welcome Back</Text>
      <Text>Email</Text>
      <TextInput 
      placeholder='Email' 
      value={email} 
      onChangeText={(newEmail)=>{setEmail(newEmail)}} 
      />
      <Text>User Name</Text>
      <TextInput 
      placeholder='User Name' 
      value={name} 
      onChangeText={(newName)=>{setName(newName)}} 
      />
      <Text>Password</Text>
      <TextInput 
      placeholder='Password'
      value={password}
      secureTextEntry={true}
      onChangeText = {(newPassword) => {setPassword(newPassword)}}
      />
      <Text>Confirm Password</Text>
      <TextInput 
      placeholder='Confirm Password'
      value = {confirmpassword}
      secureTextEntry = {true}
      onChangeText = {(newPassword) => {setConfirmpassword(newPassword)}}
      />
      <Button title='Register' onPress={signupHandler}></Button>
      <Button title='Already User? Login here' onPress={loginHandler}></Button>
    </View>
  )
}