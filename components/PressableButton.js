//Type rnfe
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Color from "./Color";

/**
 * This is the pressable button component that will be reused
 * @param buttonPressed : title of the button
 * @param customizedStyle : the customized style for the button
 * @param children : the children component that can be wrapped up
 * @returns the button configuration
 */

export default function PressableButton({
  buttonPressed,
  customizedStyle,
  children,
}) {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          styles.pressableDefault,
          customizedStyle,
          pressed && styles.pressedStyle,
        ];
      }}
      android_ripple={{ color: Color.rippleEffect }}
      onPress={buttonPressed}
      hitSlop={15}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableDefault: {
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pressedStyle: {
    backgroundColor: Color.buttonEffect,
  },
});
