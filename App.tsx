import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { isValidPhoneNumber } from "libphonenumber-js";

import Input from "./components/Input";
import InputAddress from "./components/InputAddress";
import ProgressBar from "./components/ProgressBar";
import Step from "./components/Step";
import useStep from "./hooks/useStep";
import FinalStep from "./components/FinalStep";
import Text from "./components/Text";
import { InputsData, STEPS } from "./types/steps";

const queryClient = new QueryClient();

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export default function App() {
  const [inputs, setInputs] = useState<InputsData>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: undefined,
  });
  const stepsData = useStep(0, 6);

  const [fontsLoaded] = useFonts({
    Inter_500Medium,
  });

  const stepsComponents = [
    <Step
      titleProps={{
        text: "Pour commencer, quel est votre prénom ?",
        coloredText: "prénom",
      }}
      stepsData={stepsData}
      disabled={!stepsData.hasNextStep || inputs.firstname.length < 1}
    >
      <Input
        autoFocus={false}
        placeholder={STEPS.firstname.label}
        value={inputs.firstname}
        onChangeText={(firstname) => {
          setInputs((prevState) => ({
            ...prevState,
            firstname,
          }));
        }}
      />
    </Step>,
    <Step
      titleProps={{
        text: `Merci ${inputs.firstname}, quel est votre nom de famille ?`,
        coloredText: "nom de famille",
      }}
      stepsData={stepsData}
      disabled={!stepsData.hasNextStep || inputs.lastname.length < 1}
    >
      <Input
        placeholder={STEPS.lastname.label}
        value={inputs.lastname}
        onChangeText={(lastname) => {
          setInputs((prevState) => ({
            ...prevState,
            lastname,
          }));
        }}
      />
    </Step>,
    <Step
      titleProps={{
        text: "Quelle est votre adresse email ?",
        coloredText: "adresse email",
      }}
      stepsData={stepsData}
      disabled={!stepsData.hasNextStep || !emailRegex.test(inputs.email)}
    >
      <Input
        placeholder={STEPS.email.label}
        value={inputs.email}
        onChangeText={(email) => {
          setInputs((prevState) => ({
            ...prevState,
            email,
          }));
        }}
      />
    </Step>,
    <Step
      titleProps={{
        text: "Quel est votre numéro de téléphone ?",
        coloredText: "numéro de téléphone",
      }}
      stepsData={stepsData}
      disabled={
        !stepsData.hasNextStep ||
        !phoneRegex.test(inputs.phone) ||
        // user should define a country code in a real app
        !isValidPhoneNumber(inputs.phone, "FR")
      }
    >
      <Input
        placeholder={STEPS.phone.label}
        keyboardType="phone-pad"
        value={inputs.phone}
        onChangeText={(phone) => {
          setInputs((prevState) => ({
            ...prevState,
            phone,
          }));
        }}
      />
    </Step>,
    <Step
      titleProps={{
        text: "Super ! Quel est votre adresse de résidence ?",
        coloredText: "adresse de résidence",
      }}
      stepsData={stepsData}
      disabled={!inputs.address}
    >
      <InputAddress
        value={inputs.address}
        inputProps={{
          placeholder: STEPS.address.label,
        }}
        onSelect={(address) => {
          setInputs((prevState) => ({
            ...prevState,
            address,
          }));
        }}
      />
    </Step>,
    <FinalStep data={inputs} />,
  ];

  if (!fontsLoaded) {
    return <Text>Chargement...</Text>;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        // specific offset for number pad
        keyboardVerticalOffset={stepsData.step === 3 ? 44 : 0}
      >
        <View>
          <ProgressBar
            progress={(stepsData.step + 1) / stepsData.numberSteps}
            onPress={stepsData.previous}
            hideBackButton={!stepsData.hasPreviousStep}
          />
        </View>
        <View style={styles.form}>{stepsComponents[stepsData.step]}</View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Inter_500Medium",
    color: "red",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24,
    backgroundColor: "#F4EADF",
    minHeight: "100%",
  },
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 16,
  },
});
