import React from "react";
import { StyleSheet, View } from "react-native";
import { InputsData, InputTypes, STEPS } from "../types/steps";
import Title from "./Title";
import Text from "./Text";

const FinalStep = ({ data }: { data: InputsData }) => {
  const steps = Object.entries(data).map((el) => el[0] as InputTypes);

  return (
    <View style={styles.container}>
      <Title text="Informations personnelles" coloredText="Informations" />
      <View style={styles.list}>
        {steps.map((step) => {
          return (
            <View style={styles.item} key={step}>
              <Text style={styles.title}>{STEPS[step].label}</Text>
              {step === "address" ? (
                <>
                  <Text>{data[step]?.properties.name}</Text>
                  <Text>{data[step]?.properties.postcode}</Text>
                  <Text>{data[step]?.properties.city}</Text>
                </>
              ) : (
                <Text>{data[step]}</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  title: {
    color: "#7F8590",
    fontSize: 14,
  },
  item: {
    borderRadius: 10,
    backgroundColor: "white",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    shadowColor: "#212836",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
});

export default FinalStep;
