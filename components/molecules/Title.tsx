import React from "react";
import { StyleSheet, View } from "react-native";
import { Raleway_800ExtraBold, useFonts } from "@expo-google-fonts/raleway";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "../atoms/Text";

export type TitleProps = {
  text: string;
  coloredText: string;
  color?: string;
  style?: StyleProp<TextStyle>;
};

const Title = ({ text, coloredText, color = "#4D50F4", style }: TitleProps) => {
  const [fontsLoaded] = useFonts({
    Raleway_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View>
      <Text style={[styles.title, style]}>
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
  },
});

export default Title;
