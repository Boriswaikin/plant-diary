import { View, StyleSheet, Image } from "react-native";
import React from "react";

const Icon = (props) => {
  return (
    <View style={styles(props).body}>
      <Image
        style={{
          width: props.size,
          height: props.size,
          borderRadius: props.size,
          marginTop: 10,
          marginLeft: 10,
          marginBottom:10,
        }}
        source={{ uri: props.source }}
      ></Image>
    </View>
  );
};

const styles = (props) =>
  StyleSheet.create({
    body: {
      width: props.size,
      height: props.size,
      borderRadius: props.size,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
    },
  });

export default Icon;
