import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { isValidPhoneNumber } from "libphonenumber-js";
import { LinearGradient } from "expo-linear-gradient";

import Input from "./components/atoms/Input";
import InputAddress from "./components/molecules/InputAddress";
import ProgressBar from "./components/molecules/ProgressBar";
import Step from "./components/templates/Step";
import useStep from "./hooks/useStep";
import FinalStep from "./components/templates/FinalStep";
import Text from "./components/atoms/Text";
import { InputsData, STEPS } from "./types/steps";

const queryClient = new QueryClient();

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

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

  const stepsComponents = useMemo(
    () => [
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
          autoComplete="given-name"
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
          autoComplete="family-name"
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
          autoComplete="email"
          keyboardType="email-address"
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
          // user should define a country code in a real app
          !isValidPhoneNumber(inputs.phone, "FR")
        }
      >
        <Input
          placeholder={STEPS.phone.label}
          autoComplete="tel"
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
            autoComplete: "street-address"
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
    ],
    [stepsData, inputs],
  );

  if (!fontsLoaded) {
    return <Text>Chargement...</Text>;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.wrapper}
        // specific offset for number pad
        keyboardVerticalOffset={stepsData.step === 3 ? 44 : 0}
      >
        <LinearGradient colors={["#F4EADF", "white"]} style={styles.container}>
          <View>
            <ProgressBar
              progress={(stepsData.step + 1) / stepsData.numberSteps}
              onPress={stepsData.previous}
              hideBackButton={!stepsData.hasPreviousStep}
            />
          </View>
          <View style={styles.form}>{stepsComponents[stepsData.step]}</View>
          <StatusBar style="auto" />
        </LinearGradient>
      </KeyboardAvoidingView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    fontFamily: "Inter_500Medium",
    flex: 1,
    minHeight: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24,
    flex: 1,
  },
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});
