import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../Firebase/firebase-setup';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  function loginHandler() {
    navigation.replace('Login');
  }

  async function signupHandler() {
    if (password !== confirmpassword) {
      Alert.alert("Passwords are not matched");
  } else {
      try {
          await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
          console.log("signup err", err);
      }
  }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome Back</Text>
      <Text>Email</Text>
      <TextInput 
      style={styles.input}
      placeholder='Email' 
      value={email} 
      onChangeText={(newEmail)=>{setEmail(newEmail)}} 
      />
      <Text>User Name</Text>
      <TextInput 
      style={styles.input}
      placeholder='User Name' 
      value={name} 
      onChangeText={(newName)=>{setName(newName)}} 
      />
      <Text>Password</Text>
      <TextInput 
      style={styles.input}
      placeholder='Password'
      value={password}
      secureTextEntry={true}
      onChangeText = {(newPassword) => {setPassword(newPassword)}}
      />
      <Text>Confirm Password</Text>
      <TextInput 
      style={styles.input}
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

const styles = StyleSheet.create({
  container: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
  },
  input: {
      fontSize:16, 
      padding:5,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      marginBottom: 10,
      width: '50%',
    },
})