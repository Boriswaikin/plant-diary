import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../Firebase/firebase-setup';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginHandler() {
    try {
      const usreCred = await signInWithEmailAndPassword(auth, email, password);
          console.log(usreCred);
      } catch (err) {
          console.log("Login err", err);
      }
    // navigation.navigate('Home');
  }
  function signupHandler() {
    navigation.replace("Signup");
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
      <Text>Password</Text>
      <TextInput 
      style={styles.input}
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