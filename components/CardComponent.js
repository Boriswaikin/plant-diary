import { View, StyleSheet } from "react-native";
import React from "react";
import Color from "./Color";
/**
 * This is the card component that will be used
 * @param props.flexDirection : the flexDirection of the card
 * @param props.justifyContent : the justifyContent of the card
 * @param props.alignItems : the alignItems of the card
 * @param props.color : the background color of the card
 * @param props.width : the width of the card
 * @param props.height : the height of the card
 * @param props.radius : the border radius of the card
 * @param props.marginBottom : the margin Bottom of the card
 * @returns the card configuration
 */
const CardComponent = (props) => {
  return <View style={[styles(props).body]}>{props.children}</View>;
};
const styles = (props) =>
  StyleSheet.create({
    body: {
      flexDirection: props.flexDirection,
      justifyContent: props.justifyContent,
      width: props.width,
      height: props.height,
      alignItems: props.alignItems,
      backgroundColor: Color.contentColor,
      borderRadius: 20,
      marginBottom: 15,
    },
  });

export default CardComponent;
