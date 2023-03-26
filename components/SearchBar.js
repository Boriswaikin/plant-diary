import { View, Text,StyleSheet} from 'react-native'
import React, { useState } from 'react'
import InputComponent from './InputComponent'
import Color from './Color';
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
    const [text,setText] = useState("");
  return (
    <View style={styles.container}>
        <Ionicons
            name="search"
            size={20}
        ></Ionicons>
        <InputComponent
          inputHeight={20}
          marginLeft={5}
          inputChangeText={setText}
          inputValue={text}
          inputAlign="left"
          backgroundColor={Color.transparent}
          width={210}
          radius={6}
          inputPlaceholder="Search"
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:5,
    padding:5,
    flexDirection:"row",
    backgroundColor: Color.transparent,
    borderRadius: 10
  }});