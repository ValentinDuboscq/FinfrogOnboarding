import React from "react";
import { Animated, StyleSheet, View } from "react-native";

type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: "#CACBFC",
    borderRadius: 3,
    margin: 26,
  },
  bar: {
    height: 4,
    backgroundColor: "#4D50F4",
    borderRadius: 3,
  },
});

export default ProgressBar;
