import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

const Input = (props: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(props.autoFocus);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <TextInput
      style={[styles.input, isFocused && { borderColor: "#4D50F4" }]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default Input;
