import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../Firebase/firebase-setup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginHandler() {
    try {
      const usreCred = await signInWithEmailAndPassword(auth, email, password);
          console.log(usreCred);
      } catch (err) {
          if(err.code==="auth/invalid-email"){
            Alert.alert("User does not exist");}
          if(err.code==="auth/wrong-password"){
            Alert.alert("Invalid password");}
          console.log("Login err", err);
      }
    // navigation.navigate('Home');
  }
  function signupHandler() {
    navigation.replace("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome    Back</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconInput}>
          <MaterialIcons name="alternate-email" size={24} color="black" style={styles.icon} />
          <TextInput 
          style={styles.input}
          placeholder='Email Address' 
          value={email} 
          onChangeText={(newEmail)=>{setEmail(newEmail)}} 
          />
        </View>
        <View style={styles.iconInput}>
          <MaterialIcons name="lock-outline" size={24} color="black" style={styles.icon} />
          <TextInput 
          style={styles.input}
          placeholder='Password'
          value={password}
          secureTextEntry={true}
          onChangeText = {(newPassword) => {setPassword(newPassword)}}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PressableButton customizedStyle={styles.button} buttonPressed={()=>loginHandler()}>
          <Text style={styles.buttonText}>Login</Text>
        </PressableButton>
        <View style={{flexDirection: 'row', alignItems: 'center', margin:10}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
          <View>
            <Text style={{width: 30, textAlign: 'center', fontSize: 16}}>or</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
        </View>
        <PressableButton customizedStyle={styles.button} buttonPressed={()=>signupHandler()}>
          <Text style={styles.buttonText}>Register</Text>
        </PressableButton>
      </View>
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