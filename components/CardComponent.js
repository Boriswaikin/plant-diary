import { View, StyleSheet } from "react-native";
import React from "react";

/**
 * This is the card component that will be used
 * @param props.flexDirection : the flexDirection of the card
 * @param props.justifyContent : the justifyContent of the card
 * @param props.alignItems : the alignItems of the card
 * @param props.color : the background color of the card
 * @param props.width : the width of the card
 * @param props.height : the height of the card
 * @param props.radius : the border radius of the card
 * @param props.marginTop : the margin Top of the card
 * @param props.marginLeft : the margin Left of the card
 * @param props.marginBottom : the margin Bottom of the card
 * @param props.marginRight : the margin Right of the card
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
      alignItems: props.alignItems,
      backgroundColor: props.color,
      width: props.width,
      height: props.height,
      borderRadius: props.radius,
      marginTop: props.marginTop,
      marginLeft: props.marginLeft,
      marginBottom: props.marginBottom,
      marginRight: props.marginRight,
    },
  });

export default CardComponent;
