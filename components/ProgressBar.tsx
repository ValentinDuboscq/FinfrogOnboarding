import React from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import Back from "./icons/Back";

type ProgressBarProps = {
  progress: number;
  onPress: () => void;
  hideBackButton?: boolean;
};

const ProgressBar = ({
  progress,
  onPress,
  hideBackButton = false,
}: ProgressBarProps) => {
  return (
    <View style={styles.wrapper}>
      {!hideBackButton ? (
        <Pressable style={styles.back} onPress={onPress}>
          <Back />
        </Pressable>
      ) : null}
      {/* hide when progress is full */}
      {progress < 1 ? (
        <View style={styles.container}>
          <Animated.View
            style={[styles.bar, { width: `${progress * 100}%` }]}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    paddingVertical: 26,
    paddingHorizontal: "15%",
  },
  container: {
    height: 4,
    backgroundColor: "#CACBFC",
    borderRadius: 3,
  },
  bar: {
    height: 4,
    backgroundColor: "#4D50F4",
    borderRadius: 3,
  },
  back: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "flex-end",
    width: 20,
    padding: 20,
  },
});

export default ProgressBar;
