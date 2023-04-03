import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

/**
 * This is the textInput component that will be used by screens
 * @param props.inputHeight : the alternate height of the textInput
 * @param props.inputValue : the text value of the textInput
 * @param props.inputChangeText : the changeText of the textInput
 * @param props.textAlign : the text alignment of the textInput
 * @param props.backgroundColor : the background color of the textInput
 * @param props.width : the width of the textInput
 * @param props.padding : the padding of the textInput
 * @param props.radius : the border radius of the textInput
 * @param props.marginTop : the marginTop of the textInput
 * @returns the textInput configuration
 */
const InputComponent = (props) => {
  return (
    <View>
      <TextInput
        multiline
        style={[styles(props).input, { height: props.inputHeight }]}
        value={props.inputValue}
        onChangeText={props.inputChangeText}
        textAlign={props.inputAlign}
        placeholder={props.inputPlaceholder}
      />
    </View>
  );
};
const styles = (props) =>
  StyleSheet.create({
    input: {
      backgroundColor: props.backgroundColor,
      width: props.width,
      padding: props.padding,
      borderRadius: props.radius,
      marginTop: props.marginTop,
      marginLeft: props.marginLeft,
    },
  });
export default InputComponent;
