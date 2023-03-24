import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler() {
    navigation.navigate('Home');
  }
  function signupHandler() {
    navigation.replace("Signup");
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
      <Text>Password</Text>
      <TextInput 
      placeholder='Password'
      value={password}
      secureTextEntry={true}
      onChangeText = {(newPassword) => {setPassword(newPassword)}}
      />
      <Button title='Login' onPress={loginHandler}></Button>
      <Button title='New User? Create An Account' onPress={signupHandler}></Button>
    </View>
  )
}