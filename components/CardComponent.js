import { View, StyleSheet } from "react-native";
import React from "react";
import Color from "./Color";

export default function CardComponent(props) {
  return <View style={styles.body}>{props.children}</View>;
};
const styles = StyleSheet.create({
    body: {
      backgroundColor: 'white',
      marginVertical: 10,
      marginHorizontal: 30,
      padding: 30,
      borderRadius: 10,
      shadowOffset: {
        width: 8,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 8,
    },
});
