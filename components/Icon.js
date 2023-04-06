import { View, StyleSheet, Image } from "react-native";
import React from "react";

export default function Icon ({size, source}) {
  return (
    <View         
    style={{
      width: size,
      height: size,
    }}>
      {source&&source!==''&&<Image
          style={{
            width: size,
            height: size,
            borderRadius: size,
          }}
        source={{ uri:source }}
      ></Image>}
    </View>
  );
};
