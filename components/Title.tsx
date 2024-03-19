import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Raleway_800ExtraBold, useFonts } from "@expo-google-fonts/raleway";

export type TitleProps = {
  text: string;
  coloredText: string;
  color?: string;
};

const Title = ({ text, coloredText, color = "#4D50F4" }: TitleProps) => {
  const [fontsLoaded] = useFonts({
    Raleway_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View>
      <Text style={styles.title}>
        {text.split(coloredText)[0]}
        <Text style={{ color }}>{coloredText}</Text>
        {text.split(coloredText)[1]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Raleway_800ExtraBold",
    fontSize: 28,
    marginBottom: "50%",
  },
});

export default Title;
