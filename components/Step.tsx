import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "./Button";
import useStep from "../hooks/useStep";
import Title, { TitleProps } from "./Title";

type StepProps = {
  titleProps: TitleProps;
  // inputProps: TextInputProps;
  stepsData: ReturnType<typeof useStep>;
  disabled?: boolean;
  children: ReactNode;
};

const Step = ({
  titleProps,
  // inputProps,
  stepsData,
  disabled = true,
  children,
}: StepProps) => {
  const { next } = stepsData;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Title {...titleProps} style={{ marginBottom: "50%" }} />
        {/*<Text style={styles.title}>{title}</Text>*/}
        <View style={styles.form}>
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
  form: {
    display: "flex",
    gap: 16,
    flexDirection: "column",
  },
});

export default Step;
