import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../Firebase/firebase-setup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createProfile } from '../Firebase/helper';
import { MaterialIcons } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';

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
          await createProfile({name:name,email:email});
      } catch (err) {
          console.log("signup err", err);
      }
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create      Account</Text>
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
          <MaterialIcons name="person-outline" size={24} color="black" style={styles.icon} />
          <TextInput 
          style={styles.input}
          placeholder='User Name' 
          value={name} 
          onChangeText={(newName)=>{setName(newName)}} 
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
        <View style={styles.iconInput}>
          <MaterialIcons name="lock" size={24} color="black" style={styles.icon} />
          <TextInput 
          style={styles.input}
          placeholder='Confirm Password'
          value = {confirmpassword}
          secureTextEntry = {true}
          onChangeText = {(newPassword) => {setConfirmpassword(newPassword)}}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PressableButton customizedStyle={styles.button} buttonPressed={()=>signupHandler()}>
          <Text style={styles.buttonText}>Register</Text>
        </PressableButton>
        <View style={{flexDirection: 'row', alignItems: 'center', margin:10}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
          <View>
            <Text style={{width: 30, textAlign: 'center', fontSize: 16}}>or</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
        </View>
        <PressableButton customizedStyle={styles.button} buttonPressed={()=>loginHandler()}>
          <Text style={styles.buttonText}>Login</Text>
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