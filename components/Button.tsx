import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

const Button = (props: PressableProps & { title: string }) => {
  const { title = "Save" } = props;

  return (
    <Pressable
      {...props}
      style={[
        styles.button,
        props.disabled && styles.buttonDisabled,
        // @ts-ignore
        props.style,
      ]}
    >
      <Text style={[styles.text, props.disabled && styles.textDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: "#4D50F4",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonDisabled: {
    backgroundColor: "#EDEEFE",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textDisabled: {
    color: "#CACBFC",
  },
});

export default Button;
