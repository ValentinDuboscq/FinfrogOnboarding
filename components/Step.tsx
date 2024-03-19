import { Raleway_800ExtraBold, useFonts } from "@expo-google-fonts/raleway";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "./Button";
import useStep from "../hooks/useStep";

type StepProps = {
  title: string;
  // inputProps: TextInputProps;
  stepsData: ReturnType<typeof useStep>;
  disabled?: boolean;
  children: ReactNode;
};

const Step = ({
  title,
  // inputProps,
  stepsData,
  disabled = true,
  children,
}: StepProps) => {
  const { next } = stepsData;

  const [fontsLoaded] = useFonts({
    Raleway_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text>Chargement...</Text>;
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.form}>
          {/*<Input {...inputProps} />*/}
          {children}
          <Button
            title="Continuer"
            disabled={disabled}
            onPress={next}
            style={{ marginLeft: "auto" }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontFamily: "Raleway_800ExtraBold",
    fontSize: 28,
    marginBottom: "50%",
  },
  form: {
    display: "flex",
    gap: 16,
    flexDirection: "column",
  },
});

export default Step;
