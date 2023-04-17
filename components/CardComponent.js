import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Color from "./Color";

const w = Dimensions.get('window').width;

export default function CardComponent(props) {
  return <View style={styles.body}>{props.children}</View>;
};
const styles = StyleSheet.create({
    body: {
      maxWidth: w - 60,
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
      elevation: (Platform.OS === 'android') ? 8 : 0,
    },
});
